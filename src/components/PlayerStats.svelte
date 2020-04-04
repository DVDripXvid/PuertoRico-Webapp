<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";
  import Role from "./Role.svelte";

  export let victoryPoints;
  export let doubloons;
  export let colonists;
  export let role;
  export let endPhaseEnabled = false;

  const dispatch = createEventDispatcher();

  const stats = tweened(null, {
    duration: 1000,
    easing: cubicOut
  });

  $: stats.set({ victoryPoints, doubloons, colonists });
</script>

<div class="h-full flex flex-row justify-around">
  {#if role}
    <div class="flex-initial w-10">
      <Role {role} />
    </div>
  {/if}
  <div class="flex-initial">
    <button on:click={() => dispatch('endPhase')} disabled={!endPhaseEnabled}>
      End phase
    </button>
  </div>
  <div class="flex-initial">Doubloons: {doubloons}</div>
  <div class="flex-initial">Colonists: {colonists}</div>
  <div class="flex-initial">VP: {victoryPoints}</div>
</div>
