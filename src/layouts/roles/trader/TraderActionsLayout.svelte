<script>
  export let goodTypes = [];
</script>

<div class="flex flex-col justify-center items-start">
  {#each goodTypes as goodType}
    <div class="flex-initial m-1">
      <slot prop={goodType} />
    </div>
  {/each}
</div>
