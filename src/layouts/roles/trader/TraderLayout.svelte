<script>
  export let goods = [];
</script>

<div class="h-full flex flex-col">
  <div class="flex-1 flex flex-row flex-wrap">
    {#each goods as good}
      <div class="flex-1/2 p-2">
        <slot prop={good} />
      </div>
    {/each}
  </div>
  <div class="h-full flex-1">
    <slot name="actions" />
  </div>
</div>
