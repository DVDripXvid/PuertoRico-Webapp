<script>
  export let goods = [];
</script>

<style>
  .max-w-slot {
    max-width: 30vh;
  }
</style>

<div class="h-full flex flex-col portrait:flex-row">
  <div class="flex-1 flex flex-row flex-wrap justify-center">
    {#each goods as good}
      <div class="flex-1/2 p-p5 max-w-slot">
        <slot prop={good} />
      </div>
    {/each}
  </div>
  <div class="h-full flex-1">
    <slot name="actions" />
  </div>
</div>
