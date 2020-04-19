<script>
  import PlayerProfile from "./PlayerProfile.svelte";
  import RandomColor from "./RandomColor.svelte";

  export let userName;
  export let imageUrl;
  export let isCurrent = false;
</script>

<div class="flex flex-row justify-center items-center" on:click>
  <div class="flex-initial w-1/4">
    {#if isCurrent}
      <img src="img/misc/Flag.svg" alt="➤" />
    {/if}
  </div>
  <div
    class="flex-initial w-full transform transition-all duration-500
    hover:scale-75">
    <PlayerProfile {userName} {imageUrl} />
  </div>
</div>
