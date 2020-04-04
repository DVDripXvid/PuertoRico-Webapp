<script>
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import RandomColor from "../../../components/RandomColor.svelte";

  export let buildings = [];
</script>

<div class="flex flex-row flex-wrap">
  {#each buildings as building, i (building.index)}
    <div class="flex-1/3" animate:flip={{ duration: 300, easing: quintOut }} transition:fade={{ duration: 300 }}>
      <slot prop={building}>
        <RandomColor />
      </slot>
    </div>
  {/each}
</div>
