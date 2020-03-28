<script>
  import Builder from "../components/roles/Builder.svelte";
  import Captain from "../components/roles/Captain.svelte";
  import Prospector from "../components/roles/Prospector.svelte";
  import Craftsman from "../components/roles/Craftsman.svelte";
  import Mayor from "../components/roles/Mayor.svelte";
  import Settler from "../components/roles/Settler.svelte";
  import Trader from "../components/roles/Trader.svelte";

  import { createEventDispatcher } from "svelte";

  export let prospectorCount;
  $: array = [...Array(prospectorCount).keys()];

  const dispatch = createEventDispatcher();

  function handleClick(roleName) {
    dispatch("select", {
      roleName
    });
  }
</script>

<div class="h-full flex flex-row">
  <div class="flex-1" on:click={() => handleClick('Builder')}>
    <Builder />
  </div>
  <div class="flex-1" on:click={() => handleClick('Captain')}>
    <Captain />
  </div>
  <div class="flex-1" on:click={() => handleClick('Craftsman')}>
    <Craftsman />
  </div>
  <div class="flex-1" on:click={() => handleClick('Mayor')}>
    <Mayor />
  </div>
  <div class="flex-1" on:click={() => handleClick('Settler')}>
    <Settler />
  </div>
  <div class="flex-1" on:click={() => handleClick('Trader')}>
    <Trader />
  </div>
  {#each array as item}
    <div class="flex-1" on:click={() => handleClick('Prospector')}>
      <Prospector />
    </div>
  {/each}
</div>
