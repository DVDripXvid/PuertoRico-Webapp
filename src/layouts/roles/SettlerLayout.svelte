<script>
  export let plantations = [];
</script>

<div class="flex flex-row flex-wrap">
  {#each plantations as plantation}
    <div class="flex-1/2 p-5">
      <slot prop={plantation} />
    </div>
  {/each}
  <div class="flex-break" />
  <div class="flex-1/2 p-5">
    <slot name="quarry" />
  </div>
  <div class="flex-1/2 p-5">
    <slot name="hacienda" />
  </div>
</div>
