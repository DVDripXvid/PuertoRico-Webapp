<script>
  export let tile;
  export let selected = false;
  export let isButton = false;

  $: imgUrl = `./img/tiles/${tile.name}.svg`;
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
  on:click|stopPropagation
  class:cursor-pointer={isButton}
  class:selected
  class:unselected={!selected}
  style={`background: url(${imgUrl})`}>

  <svg viewBox="0 0 92 92">
    <circle
      class:filledSlot={tile.hasWorker}
      class:emptySlot={!tile.hasWorker}
      cx="21.79"
      cy="70.42"
      r="15.3" />
  </svg>
</div>
