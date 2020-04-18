<script>
  import { onMount, getContext } from "svelte";
  import Layout from "../../layouts/roles/builder/BuilderLayout.svelte";
  import SmallBuildingsLayout from "../../layouts/roles/builder/SmallBuildingsLayout.svelte";
  import LargeBuildingsLayout from "../../layouts/roles/builder/LargeBuildingsLayout.svelte";
  import Building from "../../components/Building.svelte";
  import {
    currentGameStore,
    currentActionStore,
    signedInPlayerStore
  } from "../../services/stores";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  $: buildings = getBuildingsWithDiscount($currentGameStore.buildings);

  $: tabs = [
    {
      name: "Production",
      buildings: buildings.filter(b => b.type === "Production"),
      layout: SmallBuildingsLayout
    },
    {
      name: "Small",
      buildings: buildings.filter(b => b.type === "Small"),
      layout: SmallBuildingsLayout
    },
    {
      name: "Large",
      buildings: buildings.filter(b => b.type === "Large"),
      layout: LargeBuildingsLayout
    }
  ];

  let selectedTab = {};

  const hub = getContext(gameHubCtx);

  onMount(() => {
    selectedTab = tabs[0];
  });

  function getBuildingsWithDiscount(buildings) {
    let discount = $signedInPlayerStore.hasPrivilege ? 1 : 0;
    return buildings.map(b => ({
      ...b,
      cost: Math.max(
        0,
        b.cost -
          Math.min(
            b.maxDiscountByQuarry,
            discount +
              $signedInPlayerStore.tiles.filter(t => t.name === "Quarry" && t.hasWorker).length
          )
      )
    }));
  }

  function onBuildingClick(building) {
    hub.sendCommand(CommandType.Build, { buildingIndex: building.index });
  }
</script>

<Layout {tabs} let:prop={tab}>
  <div
    class:bg-stats={tab.name == selectedTab.name}
    class="text-center rounded-t"
    on:click={() => (selectedTab = tab)}>
    {tab.name}
  </div>
  <div class="h-full bg-stats p-p1" slot="content">
    <svelte:component
      this={selectedTab.layout}
      buildings={selectedTab.buildings}
      let:prop={building}>
      <Building {building} on:click={() => onBuildingClick(building)} />
    </svelte:component>
  </div>
</Layout>
