<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let victoryPoints;
  export let doubloons;
  export let colonists;
  export let goods = [];

  const stats = tweened(null, {
    duration: 1000,
    easing: cubicOut
  });

  $: stats.set({
    victoryPoints,
    doubloons,
    colonists,
    corn: goods.filter(g => g.type === "Corn").length,
    indigo: goods.filter(g => g.type === "Indigo").length,
    coffee: goods.filter(g => g.type === "Coffee").length,
    tobacco: goods.filter(g => g.type === "Tobacco").length,
    sugar: goods.filter(g => g.type === "Sugar").length
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
      alt: "Doubloons: ",
      imgSrc: "./img/misc/Doubloon.svg",
      statKey: "doubloons"
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

<div class="h-full bg-beige flex flex-row justify-around">
  {#each items as item}
    <div class="flex-initial flex flex-row items-center mt-1 mb-1">
      <div class="flex-initial w-6 ml-3 mr-1">
        <img src={item.imgSrc} alt={item.alt} />
      </div>
      <div class="flex-initial">{Math.round($stats[item.statKey])}</div>
    </div>
  {/each}
</div>
