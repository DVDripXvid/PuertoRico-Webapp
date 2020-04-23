<script>
  export let tabs = [];
</script>

<div class="h-full flex flex-col">
  <div class="flex-initial flex flex-row h-10">
    {#each tabs as tab}
      <div class="flex-1 self-end">
        <slot prop={tab} />
      </div>
    {/each}
  </div>
  <div class="flex-auto">
    <slot name="content" />
  </div>
</div>
