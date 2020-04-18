<script>
  import RandomColor from "./RandomColor.svelte";

  export let name;
</script>

<style>
  p {
    writing-mode: vertical-rl;
  }
</style>

<div class="py-1 flex h-full bg-stats rounded-r-lg items-center justify-center text-default font-bold" on:click>
  <p>{name}</p>
</div>
