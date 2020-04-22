<script>
  import { createEventDispatcher } from "svelte";
  export let goodTypes;

  const dispatch = createEventDispatcher();
</script>

<style>
  .word {
    @apply flex-initial m-1;
  }
</style>

<div class="flex flex-row justify-center">
  <div class="word">Ship all</div>
  {#each goodTypes as goodType}
    <div class="word w-6 cursor-pointer" on:click={() => dispatch('select', goodType)}>
      <img src={`./img/goods/${goodType}.svg`} alt={goodType} />
    </div>
  {/each}
  <div class="word">using</div>
  <div class="word">your</div>
  <div class="word">wharf</div>
</div>
