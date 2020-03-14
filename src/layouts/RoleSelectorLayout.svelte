<script>
  import RandomColor from "../components/RandomColor.svelte";

  export let roles = [];
</script>

<div class="h-full flex flex-col">
  {#each roles as role}
    <div class="flex-1">
      <slot>
        <RandomColor />
      </slot>
    </div>
  {/each}
</div>
