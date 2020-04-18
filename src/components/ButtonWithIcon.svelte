<script>
  import { onMount } from "svelte";
  export let iconUrl;
  export let text = "";
  export let reverse = false;

  let element;

  onMount(() => {
    element.style.width = element.offsetHeight + "px";
  });
</script>

<div
  class="h-full flex flex-row bg-tobacco hover:bg-coffee cursor-pointer"
  on:click|stopPropagation
  class:flex-row-reverse={reverse}>
  <div
    bind:this={element}
    class="flex-initial h-full bg-cover"
    style={`background-image: url(${iconUrl})`} />
  <div class="p-1 flex-initial">
    <button class="border-none">{text}</button>
  </div>
</div>
