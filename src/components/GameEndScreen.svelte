<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { fly, draw } from "svelte/transition";

  import Overlay from "../components/Overlay.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";

  export let gameResults;

  let gameEndResults = gameResults.map(gr => ({
    result: gr.result,
    ...gr.player
  }));

  gameEndResults.sort((a, b) => b.result - a.result);

  let currentPlayerIndex = 0;
  let maxVp = gameEndResults[0].result;
  let results = [];

  let initialPercents = {};
  gameEndResults.forEach(r => (initialPercents[r.userId] = 20));
  let initialPoints = {};
  gameEndResults.forEach(r => (initialPoints[r.userId] = 0));

  let percents = tweened(initialPercents, {
    delay: 500,
    duration: 1500,
    easing: cubicInOut
  });

  let points = tweened(initialPoints, {
    delay: 500,
    duration: 1500,
    easing: cubicInOut
  });

  function displayNextPlayerResult() {
    let player = gameEndResults[currentPlayerIndex];
    percents.update(pers => ({
      ...pers,
      [player.userId]: (player.result / maxVp) * 100
    }));
    points.update(ps => ({
      ...ps,
      [player.userId]: player.result
    }));
    results = [...results, player];
    currentPlayerIndex += 1;
    if (currentPlayerIndex >= gameEndResults.length) {
      clearInterval(intervalId);
    }
  }

  displayNextPlayerResult();
  let intervalId = setInterval(displayNextPlayerResult, 2000);
</script>

<style>
  .max-w-container {
    max-width: 75vh;
  }
  .min-h-container {
    min-height: 75vh;
  }
</style>

<div class="flex flex-row justify-center">
  <div
    class="bg-transparent-default flex flex-col max-w-container min-h-container
    w-full">
    <div
      class="flex flex-row justify-center items-center mb-p5 text-3xl
      text-center bg-default text-text font-minion font-semibold">
      <div class="w-1/12 p-p2 min-w-6 self-center">
        <img src="img/misc/ShipL.svg" alt="*" />
      </div>
      GAME RESULTS
      <div class="w-1/12 p-p2 min-w-6 self-center">
        <img src="img/misc/ShipR.svg" alt="*" />
      </div>
    </div>
    <div class="flex flex-col">
      {#each results as player, index}
        <div
          class="flex flex-row justify-start items-center my-p3"
          in:fly={{ y: 400, duration: 700 }}>
          <div
            class="flex-initial mx-p5 text-3xl font-minion font-semibold
            text-text">
            {index + 1}.
          </div>
          <div class={`flex-1 max-w-1/${gameEndResults.length * 2}`}>
            <PlayerProfile
              username={player.username}
              imageUrl={player.pictureUrl} />
          </div>
          <div class="flex flex-row flex-initial items-center">
            <div
              class="w-16 text-center ml-p20 mr-p2 text-3xl font-minion
              font-semibold text-text">
              {Math.round($points[player.userId])}
            </div>
            <div class="flex-initial ">
              <img
                src="img/misc/VictoryPoint.svg"
                alt="VP-s"
                class="w-10 p-p2" />
            </div>
          </div>
          <div class="flex-auto">
            <div
              class="flex flex-row justify-end"
              style={`width: ${$percents[player.userId]}%`}>
              <div class="flex-auto bg-no-repeat bg-cover" style="background-image: url(img/misc/Wave.svg)" />
              <div class="flex-initial min-w-6 p-p2">
                <img src="img/misc/ShipR.svg" alt="*" />
              </div>
            </div>
          </div>
        </div>
      {/each}

    </div>
  </div>
</div>
