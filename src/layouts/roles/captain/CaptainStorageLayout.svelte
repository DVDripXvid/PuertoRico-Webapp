<script>
  export let storages = [];
</script>

<div class="h-full flex flex-col">
  {#each storages as storage}
    <div class="flex-1">
      <slot prop={storage} />
    </div>
  {/each}
  <div class="flex-initial flex flex-row-reverse">
    <div class="flex-initial m-2">
      <slot name="action" />
    </div>
  </div>
</div>
