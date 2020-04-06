<script>
  import { createEventDispatcher } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let victoryPoints = 0;
  export let colonists = 0;
  export let corn = 0;
  export let indigo = 0;
  export let sugar = 0;
  export let tobacco = 0;
  export let coffee = 0;
  export let currentRoleName;

  const stats = tweened(null, {
    duration: 1000,
    easing: cubicOut
  });

  $: stats.set({
    victoryPoints,
    colonists,
    corn,
    indigo,
    sugar,
    tobacco,
    coffee
  });

  const items = [
    {
      alt: "Corn: ",
      imgSrc: "./img/goods/Corn.svg",
      statKey: "corn"
    },
    {
      alt: "Indigo: ",
      imgSrc: "./img/goods/Indigo.svg",
      statKey: "indigo"
    },
    {
      alt: "Sugar: ",
      imgSrc: "./img/goods/Sugar.svg",
      statKey: "sugar"
    },
    {
      alt: "Tobacco: ",
      imgSrc: "./img/goods/Tobacco.svg",
      statKey: "tobacco"
    },
    {
      alt: "Coffee: ",
      imgSrc: "./img/goods/Coffee.svg",
      statKey: "coffee"
    },
    {
      alt: "Colonists: ",
      imgSrc: "./img/misc/Colonist.svg",
      statKey: "colonists"
    },
    {
      alt: "VPs: ",
      imgSrc: "./img/misc/VictoryPoint.svg",
      statKey: "victoryPoints"
    }
  ];

  const dispatch = createEventDispatcher();
</script>

<div class="h-full bg-beige flex flex-row justify-between">
  <button on:click={() => dispatch('back')}>Lobby</button>
  {#each items as item}
    <div class="flex-initial flex flex-row items-center mt-1 mb-1">
      <div class="flex-initial w-6 ml-3 mr-1">
        <img src={item.imgSrc} alt={item.alt} />
      </div>
      <div class="flex-initial">{Math.round($stats[item.statKey])}</div>
    </div>
  {/each}
  {#if currentRoleName}
    <div class="flex-initial flex flex-row items-center mt-1 mb-1">
      <div class="flex-initial w-6 ml-3 mr-1">
        <img src={`./img/roles/${currentRoleName}.svg`} alt="" />
      </div>
      <div class="flex-initial">{currentRoleName}</div>
    </div>
  {/if}
  <button on:click={() => dispatch('endTurn')}>End turn</button>
</div>
