<script>
  import Layout from "../../layouts/playerBoard/PlayerBuildingsLayout.svelte";
  import Building from "../../components/Building.svelte";

  export let buildings = [];

  function handleClick(building) {
    buildings = buildings.map(b => {
      return {
        ...b,
        selected: b === building
      };
    });
  }
</script>

<Layout {buildings} let:prop={building}>
  {#if building.name}
    <Building {building} on:click={() => handleClick(building)} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
</Layout>
