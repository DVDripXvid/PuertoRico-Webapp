<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  export let role;
  $: imgUrl = `./img/roles/${role.name}.svg`;

  let element;

  onMount(() => {
    element.style.height = element.offsetWidth + "px";
  });
</script>

<div
  bind:this={element}
  class="h-full bg-no-repeat bg-center"
  on:click
  transition:fade={{ duration: 1000 }}
  style={`background-image: url(${imgUrl})`} />
