<script>
  import RandomColor from "../../components/RandomColor.svelte";

  export let players = [];
</script>

<div class="h-full flex flex-col">
  {#each players as player}
    <div class="flex-1 my-1">
      <slot>
        <RandomColor />
      </slot>
    </div>
  {/each}
</div>
