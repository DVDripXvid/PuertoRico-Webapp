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
</script>

<div class="h-full flex flex-row justify-around">
  {#each items as item}
    <div class="flex-initial flex flex-row items-center my-1">
      <div class="flex-initial w-6 mx-1 mr-1">
        <img src={item.imgSrc} alt={item.alt} />
      </div>
      <div class="flex-initial">{Math.round($stats[item.statKey])}</div>
    </div>
  {/each}
</div>
