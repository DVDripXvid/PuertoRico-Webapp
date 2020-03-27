<script>
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/PlayerBoard/PlayerTilesLayout.svelte";
  import PlayerTabsLayout from "../layouts/PlayerBoard/PlayerTabsLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import PlayerTab from "../components/PlayerTab.svelte";

  import PlayerBuildings from "./playerBoard/PlayerBuildings.svelte";
  import PlayerTiles from "./playerBoard/PlayerTiles.svelte";

  import { sessionStore } from "../services/stores";

  export let players = [
    {
      name: "Béla"
    },
    {
      name: "Lajos"
    },
    {
      name: "László"
    }
  ];

  let selectedPlayer = players[0];
</script>

<div
  class="h-full bg-no-repeat bg-cover"
  style="background-image: url(./img/board.jpg)">
  <Layout>
    <div class="h-full" slot="playerProfile">
      <PlayerProfile userName={selectedPlayer.name} />
    </div>
    <div class="h-full" slot="playerTiles">
      <PlayerTiles />
    </div>
    <div class="h-full" slot="playerBuildings">
      <PlayerBuildings />
    </div>
    <div class="h-full" slot="playerSelector">
      <PlayerTabsLayout {players} let:prop={player}>
        {#if player === selectedPlayer}
          <div />
        {:else}
          <PlayerTab
            on:click={() => (selectedPlayer = player)}
            userName={player.name} />
        {/if}
      </PlayerTabsLayout>
    </div>
  </Layout>
</div>
