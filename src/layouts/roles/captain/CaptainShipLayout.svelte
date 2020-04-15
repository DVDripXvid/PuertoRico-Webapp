<script>
  export let shipableGoods = [];
</script>

<div class="h-full flex flex-row">
  <div class="flex-auto">
    <slot name="ship" />
  </div>
  <div class="flex-initial flex flex-col justify-start p-1">
    <div class="flex-initial p-1">
      <slot name="text" />
    </div>
    {#each shipableGoods as good}
      <div class="flex-initial p-1">
        <slot prop={good} />
      </div>
    {/each}
  </div>
</div>
