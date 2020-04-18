<script>
  import RandomColor from "../../components/RandomColor.svelte";

  export let tiles = [];

  const columnCount = 4;
  const rowCount = 3;

  $: tilesGrid = generateGrid(tiles);

  function generateGrid(items) {
    const tilesGrid = [];
    for (let i = 0; i < rowCount * columnCount; i += columnCount) {
      let rowItems = items.slice(i, i + columnCount);
      while (rowItems.length < columnCount) {
        rowItems.push({});
      }
      tilesGrid.push(rowItems);
    }
    return tilesGrid;
  }
</script>

<div
  class={`${tiles.length == 0 ? 'h-full' : ''} grid grid-cols-${columnCount} grid-rows-${rowCount}`}>
  {#each tilesGrid as row}
    {#each row as tile}
      <div class="row-auto col-auto m-p2">
        <slot prop={tile}>
          <RandomColor />
        </slot>
      </div>
    {/each}
  {/each}
  <div />
</div>
