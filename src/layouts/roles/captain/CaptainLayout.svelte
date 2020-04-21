<script>
  export let cargoShips = [];
</script>

<div class="h-full flex flex-col">
  {#each cargoShips as ship}
    <div class="flex-1 pt-p10 pb-p1 bg-contain bg-no-repeat"
    style="background-image: url(./img/misc/CaptainShip.svg)">
      <slot prop={ship} />
    </div>
  {/each}
  <div class="flex-1 mt-2 mb-2">
    <slot name="wharf" />
  </div>
</div>
