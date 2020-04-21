<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let showMessage = false;
  let showMessageInternal = showMessage;

  let infoBar;
  let infoMessage;
  let infoHeight = "0px";

  onMount(() => {
    infoHeight = infoBar.offsetHeight + "px";
  });
</script>

<div class="h-full max-h-screen flex flex-col">
  <div bind:this={infoBar} class="flex-initial">
    <slot name="infoBar" />
  </div>
  {#if showMessage}
    <div
      transition:fly={{ y: -200, duration: 500 }}
      bind:this={infoMessage}
      style={`height: ${infoHeight}`}
      class="w-full absolute top-0 right-0">
      <slot name="snackBar" />
    </div>
  {/if}
  <div class="flex-auto">
    <div class="h-full flex flex-row portrait:flex-col-reverse">
      <div class="flex-1">
        <slot name="roleBoard" />
      </div>
      <div class="flex-1">
        <slot name="playerBoard" />
      </div>
    </div>
  </div>
</div>
