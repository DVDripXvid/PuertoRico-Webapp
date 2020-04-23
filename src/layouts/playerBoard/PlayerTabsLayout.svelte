<script>
  export let players = [];
</script>

<div class="h-full flex flex-col justify-start portrait:justify-center">
  {#each players as player}
    <div class="flex-initial my-p5 pr-p5">
      <slot prop={player} />
    </div>
  {/each}
</div>
