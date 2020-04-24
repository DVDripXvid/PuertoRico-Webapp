<script>
  import { onMount } from "svelte";
  export let iconUrl;
  export let text = "";
  export let reverse = false;

  let element;

  let paddingClass = reverse ? "pl-2" : "pr-2";

  
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
  <div class={`${paddingClass} p-1 flex-initial`}>
    <button class="border-none font-minion text-default font-semibold">
      {text}
    </button>
  </div>
</div>
