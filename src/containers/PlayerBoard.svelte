<script>
  import { getContext } from "svelte";
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/playerBoard/PlayerTilesLayout.svelte";
  import PlayerTabsLayout from "../layouts/playerBoard/PlayerTabsLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import PlayerTab from "../components/PlayerTab.svelte";
  import PlayerStats from "../components/PlayerStats.svelte";

  import PlayerBuildings from "./playerBoard/PlayerBuildings.svelte";
  import PlayerTiles from "./playerBoard/PlayerTiles.svelte";

  import { gameHubCtx } from "../services/contextKeys";
  import { CommandType } from "../services/gameHub";

  export let players = [];
  export let role;
  export let availableActions = [];

  let selectedPlayer = players[0];

  $: imageUrl = selectedPlayer.role
    ? `./img/roles/${selectedPlayer.role.name}.svg`
    : selectedPlayer.pictureUrl;

  const hub = getContext(gameHubCtx);
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
        {#if player.userId !== selectedPlayer.userId}
          <PlayerTab
            on:click={() => (selectedPlayer = player)}
            userName={player.userName}
            imageUrl={player.pictureUrl} />
        {/if}
      </PlayerTabsLayout>
    </div>
    <div class="h-full" slot="playerStatistics">
      <PlayerStats
        on:endPhase={() => hub.sendCommand(CommandType.EndPhase, {})}
        {role}
        endPhaseEnabled={availableActions.includes(CommandType.EndPhase)}
        doubloons={selectedPlayer.doubloons}
        victoryPoints={selectedPlayer.victoryPoints}
        colonists={selectedPlayer.idleColonistCount} />
    </div>
  </Layout>
</div>
