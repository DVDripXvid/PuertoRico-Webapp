<script>
  export let plantations = [];
</script>

<style>
  .max-w-tile {
    max-width: 24vh;
  }
</style>

<div class="flex flex-row flex-wrap">
  {#each plantations as plantation}
    <div class="flex-1/3 p-p2 max-w-tile">
      <slot prop={plantation} />
    </div>
  {/each}
  <div class="flex-break" />
  <div class="flex-1/3 p-p2 max-w-tile">
    <slot name="quarry" />
  </div>
  <div class="flex-1/3 p-p2 max-w-tile">
     <slot name="hacienda" />
  </div>
</div>
