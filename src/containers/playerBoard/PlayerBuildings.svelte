<script>
  import Layout from "../../layouts/PlayerBoard/PlayerBuildingsLayout.svelte";
  import Building from "../../components/buildings/Building.svelte";

  const buildings = [
    {
      cost: 3,
      name: "IndigoPlant",
      workerCapacity: 3,
      workerCount: 0
    },
    {
      cost: 3,
      name: "IndigoPlant",
      workerCapacity: 3,
      workerCount: 1
    },
    {
      cost: 3,
      name: "IndigoPlant",
      workerCapacity: 3,
      workerCount: 3
    },
    {
      cost: 1,
      name: "SmallIndigoPlant",
      workerCapacity: 1,
      workerCount: 0
    },
  ];
</script>

<Layout items={buildings} let:prop={building}>
  {#if building.name}
    <Building {building} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
</Layout>
