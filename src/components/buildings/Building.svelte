<script>
  import { fade } from "svelte/transition";

  export let building;
  $: imgUrl = `./img/buildings/${building.name}.svg`;
</script>

<style>
  .emptySlot {
    fill: none;
    @apply stroke-current text-primary;
  }
  .filledSlot {
    @apply fill-current stroke-current text-primary;
  }
</style>

<div transition:fade={{ duration: 1000 }} style={`background: url(${imgUrl})`}>
  <svg viewBox="0 0 128.93 85.34">
    <circle
      class:filledSlot={building.workerCount >= 1}
      class:emptySlot={building.workerCount < 1}
      cx="24.67"
      cy="63.14"
      r="15.3" />
    {#if building.workerCapacity >= 2}
      <circle
        class:filledSlot={building.workerCount >= 2}
        class:emptySlot={building.workerCount < 3}
        cx="64.47"
        cy="63.14"
        r="15.3" />
    {/if}
    {#if building.workerCapacity >= 3}
      <circle
        class:filledSlot={building.workerCount >= 3}
        class:emptySlot={building.workerCount < 3}
        cx="104.27"
        cy="63.14"
        r="15.3" />
    {/if}
    <text
      class="font-bold font-californian text-base fill-current text-primary"
      transform="translate(20.74 67.62)">
      {building.cost}
    </text>
  </svg>
</div>
