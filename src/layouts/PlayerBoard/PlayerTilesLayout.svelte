<script>
  import RandomColor from "../../components/RandomColor.svelte";

  export let items = [];

  const columnCount = 4;
  const rowCount = 3;

  const tilesGrid = [];

  for (let i = 0; i <= rowCount * columnCount; i += columnCount) {
    let rowItems = items.slice(i, columnCount);
    while (rowItems.length < columnCount) {
      rowItems.push({});
    }
    tilesGrid.push(rowItems);
  }
</script>

<div class={`${items.length == 0 ? "h-full" : ""} grid grid-cols-${columnCount} grid-rows-${rowCount}`}>
  {#each tilesGrid as row}
    {#each row as tile}
      <div class="row-auto col-auto m-2">
        <slot prop={tile}>
          <RandomColor />
        </slot>
      </div>
    {/each}
  {/each}
  <div />
</div>
