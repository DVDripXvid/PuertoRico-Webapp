<script>
  import PlayerProfile from "./PlayerProfile.svelte";

  export let username;
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
    class="cursor-pointer flex-initial w-full transform transition-all duration-500
    hover:scale-75">
    <PlayerProfile {username} {imageUrl} />
  </div>
</div>
