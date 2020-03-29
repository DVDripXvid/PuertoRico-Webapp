<script>
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/PlayerBoard/PlayerTilesLayout.svelte";
  import PlayerTabsLayout from "../layouts/PlayerBoard/PlayerTabsLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import PlayerTab from "../components/PlayerTab.svelte";

  import PlayerBuildings from "./playerBoard/PlayerBuildings.svelte";
  import PlayerTiles from "./playerBoard/PlayerTiles.svelte";

  export let players = [];

  let selectedPlayer = players[0];

  $: imageUrl = selectedPlayer.role
    ? `./img/roles/${selectedPlayer.role.name}.svg`
    : selectedPlayer.pictureUrl;
</script>

<div
  class="h-full bg-no-repeat bg-cover"
  style="background-image: url(./img/board.jpg)">
  <Layout>
    <div class="h-full" slot="playerProfile">
      <PlayerProfile userName={selectedPlayer.userName} {imageUrl} />
    </div>
    <div class="h-full" slot="playerTiles">
      <PlayerTiles tiles={selectedPlayer.tiles} />
    </div>
    <div class="h-full" slot="playerBuildings">
      <PlayerBuildings buildings={selectedPlayer.buildings} />
    </div>
    <div class="h-full" slot="playerSelector">
      <PlayerTabsLayout {players} let:prop={player}>
        {#if player !== selectedPlayer}
          <PlayerTab
            on:click={() => (selectedPlayer = player)}
            userName={player.userName}
            imageUrl={player.pictureUrl} />
        {/if}
      </PlayerTabsLayout>
    </div>
  </Layout>
</div>
