<script>
  import PlayerProfile from "./PlayerProfile.svelte";
  import RandomColor from "./RandomColor.svelte";

  export let userName;
  export let imageUrl;
</script>

<div class="h-full flex flex-col" on:click>
  <div class="flex-initial">
    <PlayerProfile {userName} {imageUrl} />
  </div>
  <div class="flex-auto">
    <RandomColor />
  </div>
</div>
