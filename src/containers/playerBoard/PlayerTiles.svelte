<script>
  import Layout from "../../layouts/PlayerBoard/PlayerTilesLayout.svelte";
  import Tile from "../../components/Tile.svelte";

  let tiles = [
    {
      name: "CoffeePlantation",
      hasWorker: true
    },
    {
      name: "CornPlantation",
      hasWorker: false
    },
    {
      name: "Quarry",
      hasWorker: true
    }
  ];

  function handleClick(tile) {
    tiles = tiles.map(t => {
      return {
        ...t,
        selected: t === tile
      };
    });
  }
</script>

<Layout {tiles} let:prop={tile}>
  {#if tile.name}
    <Tile {tile} on:click={() => handleClick(tile)} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
</Layout>
