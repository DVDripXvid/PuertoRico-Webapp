<script>
  import PlayerProfile from "./PlayerProfile.svelte";
  import RandomColor from "./RandomColor.svelte";

  export let userName;
  export let imageUrl;
</script>

<div class="flex flex-col justify-center items-center" on:click>
  <div class="flex-initial w-3/4">
    <PlayerProfile {userName} {imageUrl} />
  </div>
</div>
