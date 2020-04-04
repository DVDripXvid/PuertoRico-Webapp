<script>
  export let goodTypes = [];
</script>

<div class="h-full flex flex-col items-center justify-center content-center">
  {#each goodTypes as goodType}
    <div class="flex-initial m-1">
      <slot prop={goodType} />
    </div>
  {/each}
</div>
