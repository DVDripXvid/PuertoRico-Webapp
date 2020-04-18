<script>
  export let cargoShips = [];
</script>

<div class="h-full flex flex-col">
  {#each cargoShips as ship}
    <div class="flex-1 px-p10 py-p5">
      <slot prop={ship} />
    </div>
  {/each}
  <div class="flex-1 mt-2 mb-2">
    <slot name="wharf" />
  </div>
</div>
