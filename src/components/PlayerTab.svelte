<script>
  import PlayerProfile from "./PlayerProfile.svelte";
  import RandomColor from "./RandomColor.svelte";

  export let userName;
</script>

<div class="h-full flex flex-col" on:click>
  <div class="flex-initial">
    <PlayerProfile {userName} />
  </div>
  <div class="flex-auto">
    <RandomColor />
  </div>
</div>
