<script>
  import { getContext } from "svelte";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";
  import { hasWorkingBuilding } from "../../services/utils";
  import Layout from "../../layouts/roles/trader/TraderLayout.svelte";
  import ActionsLayout from "../../layouts/roles/trader/TraderActionsLayout.svelte";
  import { currentGameStore, signedInPlayerStore } from "../../services/stores";
  import Good from "../../components/Good.svelte";
  import SellGood from "../../components/SellGood.svelte";

  const hub = getContext(gameHubCtx);

  $: goods = getGoods($currentGameStore.tradeHouse);

  const types = [
    { name: "Corn", price: 0 },
    { name: "Indigo", price: 1 },
    { name: "Sugar", price: 2 },
    { name: "Tobacco", price: 3 },
    { name: "Coffee", price: 4 }
  ];

  $: goodTypes = types.map(gt => ({
    ...gt,
    price: gt.price + calculateBonus($signedInPlayerStore)
  }));

  function getGoods(tradeHouse) {
    const goods = tradeHouse.goods;
    while (goods.length < 4) {
      goods.push({});
    }
    return goods;
  }

  function calculateBonus(player) {
    let bonus = player.hasPrivilege ? 1 : 0;
    if (hasWorkingBuilding(player, "SmallMarket")) {
      bonus += 1;
    }

    if (hasWorkingBuilding(player, "LargeMarket")) {
      bonus += 2;
    }
    return bonus;
  }
</script>

<Layout {goods} let:prop={good}>
  {#if good.type}
    <Good {good} />
  {:else}
    <div class="h-full bg-beige opacity-75">
      <svg viewBox="0 0 170.33 170.33" />
    </div>
  {/if}
  <div class="h-full" slot="actions">
    <ActionsLayout {goodTypes} let:prop={goodType}>
      <SellGood
        on:click={() => hub.sendCommand(CommandType.SellGood, {
            goodType: goodType.name
          })}
        goodType={goodType.name}
        price={goodType.price} />
    </ActionsLayout>
  </div>
</Layout>
