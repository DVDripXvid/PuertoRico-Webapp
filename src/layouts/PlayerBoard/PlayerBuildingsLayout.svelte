<script>
  import RandomColor from "../../components/RandomColor.svelte";

  export let buildings = [];

  const columnCount = 4;
  const rowCount = 3;

  let buildingsGrid = [];
  $: buildingsGrid = genereateGrid(buildings);

  function genereateGrid(items) {
    const buildingsGrid = [];

    for (let i = 0; i <= rowCount * columnCount; i += columnCount) {
      let rowItems = items.slice(i, i + columnCount);
      while (rowItems.length < columnCount) {
        rowItems.push({});
      }
      buildingsGrid.push(rowItems);
    }
    return buildingsGrid;
  }
</script>

<div
  class={`${buildings.length == 0 ? 'h-full' : ''} grid grid-cols-${columnCount} grid-rows-${rowCount}`}>
  {#each buildingsGrid as row}
    {#each row as building}
      <div class="row-auto col-auto m-2">
        <slot prop={building}>
          <RandomColor />
        </slot>
      </div>
    {/each}
  {/each}
  <div />
</div>
