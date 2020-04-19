<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div
  on:click={() => dispatch('cancel')}
  class="fixed h-full w-full top-0 left-0 flex flex-col items-center
  justify-center bg-transparent-black">
  <div class="flex-initial self-center w-3/4">
    <slot />
  </div>
</div>
