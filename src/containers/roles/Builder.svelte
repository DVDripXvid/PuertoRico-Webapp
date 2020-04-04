<script>
  import { onMount, getContext } from "svelte";
  import Layout from "../../layouts/roles/builder/BuilderLayout.svelte";
  import SmallBuildingsLayout from "../../layouts/roles/builder/SmallBuildingsLayout.svelte";
  import LargeBuildingsLayout from "../../layouts/roles/builder/LargeBuildingsLayout.svelte";
  import Building from "../../components/Building.svelte";
  import { currentGameStore, currentActionStore } from "../../services/stores";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  $: tabs = [
    {
      name: "Production",
      buildings: $currentGameStore.buildings.filter(
        b => b.type === "Production"
      ),
      layout: SmallBuildingsLayout
    },
    {
      name: "Small",
      buildings: $currentGameStore.buildings.filter(b => b.type === "Small"),
      layout: SmallBuildingsLayout
    },
    {
      name: "Large",
      buildings: $currentGameStore.buildings.filter(b => b.type === "Large"),
      layout: LargeBuildingsLayout
    }
  ];

  let selectedTab = {};

  let hub = getContext(gameHubCtx);

  onMount(() => {
    selectedTab = tabs[0];
  });

  function onBuildingClick(building) {
    if ($currentActionStore.includes(CommandType.Build)) {
      hub.sendCommand(CommandType.Build, { buildingIndex: building.index });
    } else {
      // TODO: notification
      alert("Build is not allowed right now");
    }
  }
</script>

<Layout {tabs} let:prop={tab}>
  <div
    class:bg-ribbon-lighter={tab.name == selectedTab.name}
    class="text-center rounded-t"
    on:click={() => (selectedTab = tab)}>
    {tab.name}
  </div>
  <div class="h-full bg-ribbon-lighter" slot="content">
    <svelte:component
      this={selectedTab.layout}
      buildings={selectedTab.buildings}
      let:prop={building}>
      <Building {building} on:click={() => onBuildingClick(building)} />
    </svelte:component>
  </div>
</Layout>
