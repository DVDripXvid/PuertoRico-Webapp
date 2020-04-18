<script>
  import RandomColor from "../../components/RandomColor.svelte";

  export let buildings = [];

  const columnCount = 4;
  const rowCount = 3;

  $: buildingsGrid = genereateGrid(buildings);

  function genereateGrid(items) {
    const buildingsGrid = [];

    for (let i = 0; i < rowCount * columnCount; i += columnCount) {
      let rowItems = items.slice(i, i + columnCount);
      const largeCount = rowItems.filter(b => b.type === "Large").length;
      while (rowItems.length + largeCount < columnCount) {
        rowItems.push({});
      }
      buildingsGrid.push(rowItems);
    }

    return buildingsGrid;
  }
</script>

<style>
  .max-w-building {
    max-width: 16vh;
  }
</style>

<div
  class={`${buildings.length == 0 ? 'h-full' : ''} grid grid-cols-${columnCount} grid-rows-${rowCount}`}>
  {#each buildingsGrid as row}
    {#each row as building}
      <div
        class:row-start-1={building.type === 'Large'}
        class:row-end-3={building.type === 'Large'}
        class="m-p2 max-w-building">
        <slot prop={building}>
          <RandomColor />
        </slot>
      </div>
    {/each}
  {/each}
  <div />
</div>
