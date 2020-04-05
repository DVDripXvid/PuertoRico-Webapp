<script>
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import RandomColor from "../../../components/RandomColor.svelte";
  import { removeDuplicates } from "../../../services/utils";

  export let buildings = [];

  $: columns = generateColumns(buildings);

  function generateColumns(items) {
    const columns = [];
    for (let i = 1; i <= 3; i++) {
      const col = items.filter(b => b.maxDiscountByQuarry == i);
      const distinctCol = removeDuplicates(col, "name");
      const sortedCol = distinctCol.sort((a, b) => a.cost - b.cost);
      columns.push(sortedCol);
    }
    return columns;
  }
</script>

<div class="flex flex-row h-full">
  {#each columns as column}
    <div class="flex-1 flex flex-col h-full">
      {#each column as building, i (building.index)}
        <div
          class="flex-1"
          animate:flip={{ duration: 300, easing: quintOut }}
          transition:fade={{ duration: 300 }}>
          <slot prop={building}>
            <RandomColor />
          </slot>
        </div>
      {/each}
    </div>
  {/each}
</div>
