<script>
  import EmptyGood from "./EmptyGood.svelte";
  import Good from "./Good.svelte";

  export let ship;

  const columnCount = Math.ceil(ship.capacity / 2);
</script>

<div class={`grid grid-cols-${columnCount}-w-1/4 grid-rows-2`}>
  {#each new Array(ship.capacity) as _, id}
    <div class="m-1">
      {#if ship.goodCount > id}
        <Good good={{ type: ship.goodType }} />
      {:else}
        <EmptyGood />
      {/if}
    </div>
  {/each}
</div>
