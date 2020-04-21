<script>
  import Layout from "../../layouts/roles/captain/CaptainLayout.svelte";
  import ShipLayout from "../../layouts/roles/captain/CaptainShipLayout.svelte";
  import StorageLayout from "../../layouts/roles/captain/CaptainStorageLayout.svelte";
  import StoreActionsLayout from "../../layouts/roles/captain/CaptainStoreActionsLayout.svelte";
  import {
    signedInPlayerStore,
    currentActionStore,
    currentGameStore
  } from "../../services/stores";
  import Good from "../../components/Good.svelte";
  import CargoShip from "../../components/CargoShip.svelte";
  import UseWharf from "../../components/UseWharf.svelte";
  import StoreAction from "../../components/StoreAction.svelte";
  import ClearStoreAction from "../../components/ClearStoreAction.svelte";
  import { getContext } from "svelte";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";
  import { removeDuplicates, hasWorkingBuilding } from "../../services/utils";

  const hub = getContext(gameHubCtx);

  $: uniqueGoods = removeDuplicates($signedInPlayerStore.goods, "type");
  $: uniqueTypes = uniqueGoods.map(g => g.type);

  let stored = new Set();
  $: storable = uniqueTypes.filter(t => !stored.has(t));

  $: cargoShips = $currentGameStore.cargoShips.map(s => {
    const shipableGoods = uniqueGoods;
    return {
      ...s,
      shipableGoods
    };
  });

  $: storages = createStorages($signedInPlayerStore);

  let deliverEnabled = false;
  $: deliverEnabled = $currentActionStore.includes(CommandType.DeliverGoods);

  function createStorages(player) {
    const storages = [
      {
        id: "DefaultStorage",
        name: "Default Storage",
        capacity: "1"
      }
    ];
    if (hasWorkingBuilding(player, "SmallWarehouse")) {
      storages.push({
        id: "SmallWarehouse",
        name: "Small Warehouse",
        capacity: "all"
      });
    }
    if (hasWorkingBuilding(player, "LargeWarehouse")) {
      storages.push({
        id: "LargeWarehouse1",
        name: "Large Warehouse (1)",
        capacity: "all"
      });
      storages.push({
        id: "LargeWarehouse2",
        name: "Large Warehouse (2)",
        capacity: "all"
      });
    }
    return storages;
  }

  function updateStorage(newStorage) {
    storages = storages.map(s => (s.id === newStorage.id ? newStorage : s));
    let newStored = new Set();
    storages.forEach(s => {
      if (!s.goodType) return;
      const typeStored =
        s.capacity === "1"
          ? $signedInPlayerStore.goods.filter(g => g.type === s.goodType)
              .length <= 1
          : true;
      typeStored && newStored.add(s.goodType);
    });
    stored = newStored;
  }

  function sendStoreGoods() {
    const action = {};
    storages.forEach(s => {
      if (s.goodType) {
        action[s.id] = s.goodType;
      }
    });
    return hub.sendCommand(CommandType.StoreGoods, action);
  }
</script>

{#if $currentActionStore.includes(CommandType.StoreGoods)}
  <StorageLayout {storages} let:prop={storage}>
    {#if storage.goodType}
      <StoreActionsLayout items={[1]}>
        <ClearStoreAction
          on:click={() => updateStorage({ ...storage, goodType: null })}
          goodType={storage.goodType}
          capacity={storage.capacity}
          storeName={storage.name} />
      </StoreActionsLayout>
    {:else}
      <StoreActionsLayout items={storable} let:prop={goodType}>
        <StoreAction
          on:click={() => updateStorage({ ...storage, goodType })}
          {goodType}
          capacity={storage.capacity}
          storeName={storage.name} />
      </StoreActionsLayout>
    {/if}
    <div slot="action">
      <button on:click={sendStoreGoods}>Apply selected storing</button>
    </div>
  </StorageLayout>
{:else}
  <Layout {cargoShips} let:prop={ship}>
    <ShipLayout shipableGoods={ship.shipableGoods} let:prop={good}>
      <Good
        isButton={deliverEnabled}
        {good}
        on:click={() => hub.sendCommand(CommandType.DeliverGoods, {
            goodType: good.type,
            shipCapacity: ship.capacity
          })} />
      <div slot="text">Ship</div>
      <div class="h-full" slot="ship">
        <CargoShip {ship} />
      </div>
    </ShipLayout>

    <div slot="wharf">
      {#if hasWorkingBuilding($signedInPlayerStore, 'Wharf')}
        {#each uniqueTypes as goodType}
          <UseWharf
            {goodType}
            on:click={() => hub.sendCommand(CommandType.UseWharf, {
                goodType
              })} />
        {/each}
      {/if}
    </div>
  </Layout>
{/if}
