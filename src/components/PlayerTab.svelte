<script>
  import PlayerProfile from "./PlayerProfile.svelte";

  export let username;
  export let imageUrl;
  export let isCurrent = false;
  export let isSignedIn = false;
  export let isSelected = false;

  $: pulse = isSignedIn && isCurrent && !isSelected ;
</script>

<style>
  @keyframes downScale {
    from {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
    to {
      transform: scale(0.75);
      -webkit-transform: scale(0.75);
    }
  }

  .pulse {
    animation-duration: 0.75s;
    animation-name: downScale;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
</style>

<div class="flex flex-row justify-center items-center" on:click>
  <div class="flex-initial w-1/4">
    {#if isCurrent}
      <img src="img/misc/Flag.svg" alt="➤" />
    {/if}
  </div>
  <div
    class:pulse
    class="cursor-pointer flex-initial w-full transform transition-all
    duration-500 hover:scale-75">
    <PlayerProfile {username} {imageUrl} />
  </div>
</div>
