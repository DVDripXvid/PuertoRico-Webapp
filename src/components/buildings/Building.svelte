<script>
  export let building;
  const { name, cost, workerCapacity, workerCount } = building;
  const imgUrl = `./img/buildings/${name}.svg`;
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

<div style={`background: url(${imgUrl})`}>
  <svg viewBox="0 0 128.93 85.34">
    <circle
      class:filledSlot={workerCount >= 1}
      class:emptySlot={workerCount < 1}
      cx="24.67"
      cy="63.14"
      r="15.3" />
    {#if workerCapacity >= 2}
      <circle
        class:filledSlot={workerCount >= 2}
        class:emptySlot={workerCount < 3}
        cx="64.47"
        cy="63.14"
        r="15.3" />
    {/if}
    {#if workerCapacity >= 3}
      <circle
        class:filledSlot={workerCount >= 3}
        class:emptySlot={workerCount < 3}
        cx="104.27"
        cy="63.14"
        r="15.3" />
    {/if}
    <text class="font-bold font-californian text-base fill-current text-primary" transform="translate(20.74 67.62)">
      {cost}
    </text>
  </svg>
</div>
