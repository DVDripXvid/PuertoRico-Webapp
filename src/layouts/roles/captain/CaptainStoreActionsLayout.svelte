<script>
  export let items = [];
</script>

<div class="h-full flex flex-col">
  {#each items as item}
    <div class="flex-initial">
      <slot prop={item} />
    </div>
  {/each}
</div>
