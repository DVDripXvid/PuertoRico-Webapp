<script>
  import RandomColor from "./RandomColor.svelte";

  export let name;
</script>

<style>
  p {
    writing-mode: vertical-rl;
  }
</style>

<div class="h-full bg-primary rounded-r-lg" on:click>
  <p>{name}</p>
</div>
