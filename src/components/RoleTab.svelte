<script>
  export let name;
</script>

<style>
  p {
    writing-mode: vertical-rl;
  }
</style>

<div class="cursor-pointer py-1 flex h-full bg-stats rounded-r-lg items-center justify-center font-minion text-default font-bold" on:click>
  <p>{name}</p>
</div>
