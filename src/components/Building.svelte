<script>
  export let building;
  $: imgUrl = `./img/buildings/${building.name}.svg`;
  $: viewBox = `0 0 128.93 ${building.type === "Large" ? "177.74" : "85.34"}`;
  $: cy = building.type === "Large" ? 140 : 63.14;
  $: textY = cy + 4.48;
</script>

<style>
  .emptySlot {
    fill: none;
    @apply stroke-current text-primary;
  }
  .filledSlot {
    @apply fill-current stroke-current text-primary;
  }
  .selected {
    @apply border-2 border-dashed border-primary;
  }
  .unselected {
    @apply border-none m-px-2;
  }
</style>

<div
  on:click
  class:selected={building.selected}
  class:unselected={!building.selected}
  style={`background: url(${imgUrl})`}>
  <svg {viewBox}>
    <circle
      class:filledSlot={building.workerCount >= 1}
      class:emptySlot={building.workerCount < 1}
      cx="24.67"
      {cy}
      r="15.3" />
    {#if building.workerCapacity >= 2}
      <circle
        class:filledSlot={building.workerCount >= 2}
        class:emptySlot={building.workerCount < 3}
        cx="64.47"
        {cy}
        r="15.3" />
    {/if}
    {#if building.workerCapacity >= 3}
      <circle
        class:filledSlot={building.workerCount >= 3}
        class:emptySlot={building.workerCount < 3}
        cx="104.27"
        {cy}
        r="15.3" />
    {/if}
    <text
      class="font-bold font-californian text-base fill-current text-primary"
      transform={`translate(24 ${textY})`}
      text-anchor="middle">
      {building.cost}
    </text>
  </svg>
</div>
