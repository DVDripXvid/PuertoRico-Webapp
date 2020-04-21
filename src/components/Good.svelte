<script>
  import { onMount } from "svelte";

  export let good;
  export let isButton = false;
  $: imgUrl = `./img/goods/${good.type}.svg`;

  let element;

  onMount(() => {
    element.style.height = element.offsetWidth + "px";
  });
</script>

<div
  bind:this={element}
  class:cursor-pointer={isButton}
  class="h-full bg-no-repeat bg-center"
  on:click
  style={`background-image: url(${imgUrl})`} />
