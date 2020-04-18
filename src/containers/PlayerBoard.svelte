<script>
  import { getContext } from "svelte";
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/playerBoard/PlayerTilesLayout.svelte";
  import PlayerBuildingsLayout from "../layouts/playerBoard/PlayerBuildingsLayout.svelte";
  import PlayerTabsLayout from "../layouts/playerBoard/PlayerTabsLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import PlayerTab from "../components/PlayerTab.svelte";
  import PlayerStats from "../components/PlayerStats.svelte";
  import Tile from "../components/Tile.svelte";
  import Building from "../components/Building.svelte";
  import { gameHubCtx } from "../services/contextKeys";
  import { CommandType } from "../services/gameHub";
  import {
    currentGameStore,
    currentActionStore,
    sessionStore
  } from "../services/stores";

  const hub = getContext(gameHubCtx);

  let selectedPlayer = $currentGameStore.players.find(
    p => p.userId === $sessionStore.id
  );

  $: selectedPlayer = $currentGameStore.players.find(
    p => p.userId === selectedPlayer.userId
  );

  $: interactable =
    $currentActionStore.includes(CommandType.MoveColonist) ||
    $currentActionStore.includes(CommandType.PlaceColonist);

  let selectedBuildingIndex = NaN;
  let selectedTileIndex = NaN;

  function selectBuilding(building) {
    if (!interactable) return;
    selectedBuildingIndex = building.index;
    selectedTileIndex = NaN;
  }

  function placeOrMoveWorkerToBuilding(building) {
    if (!interactable) return;
    if (selectedBuildingIndex === building.index) {
      return;
    }
    if (selectedBuildingIndex >= 0) {
      moveColonist(selectedBuildingIndex, building.index, false, false);
      clearSelection();
      return;
    }
    if (selectedTileIndex >= 0) {
      moveColonist(selectedTileIndex, building.index, true, false);
      clearSelection();
      return;
    }
    placeColonist(building.index, false);
    clearSelection();
  }

  function onTileClick(tile) {
    if (!interactable) return;
    if (tile.hasWorker) {
      selectedBuildingIndex = NaN;
      selectedTileIndex = tile.index;
      return;
    }
    if (selectedBuildingIndex >= 0) {
      moveColonist(selectedBuildingIndex, tile.index, false, true);
      clearSelection();
      return;
    }
    if (selectedTileIndex >= 0) {
      moveColonist(selectedTileIndex, tile.index, true, true);
      clearSelection();
      return;
    }
    placeColonist(tile.index, true);
    clearSelection();
  }

  function clearSelection() {
    if (!interactable) return;
    selectedBuildingIndex = NaN;
    selectedTileIndex = NaN;
  }

  function moveColonist(fromIndex, toIndex, isMoveFromTile, isMoveToTile) {
    return hub.sendCommand(CommandType.MoveColonist, {
      fromIndex,
      toIndex,
      isMoveFromTile,
      isMoveToTile
    });
  }

  function placeColonist(toIndex, isPlaceToTile) {
    return hub.sendCommand(CommandType.PlaceColonist, {
      toIndex,
      isPlaceToTile
    });
  }

  function getImageUrl(player) {
    return player.role
      ? `./img/roles/${player.role.name}.svg`
      : player.pictureUrl;
  }
</script>

<svelte:body on:click={() => clearSelection()} />
<div
  class="h-full bg-no-repeat bg-cover"
  style="background-image: url(./img/playersideBg.svg)">
  <Layout>
    <div class="h-full" slot="playerProfile">
      <PlayerProfile
        userName={selectedPlayer.userName}
        imageUrl={getImageUrl(selectedPlayer)} />
    </div>
    <div class="h-full" slot="playerTiles">
      <PlayerTilesLayout tiles={selectedPlayer.tiles} let:prop={tile}>
        {#if tile.name}
          <Tile
            {tile}
            selected={tile.index === selectedTileIndex}
            on:click={() => onTileClick(tile)} />
        {:else}
          <div class="h-full bg-beige opacity-75" />
        {/if}
      </PlayerTilesLayout>
    </div>
    <div class="h-full" slot="playerBuildings">
      <PlayerBuildingsLayout
        buildings={selectedPlayer.buildings}
        let:prop={building}>
        {#if building.name}
          <Building
            selected={building.index === selectedBuildingIndex}
            {building}
            on:slotClick={() => placeOrMoveWorkerToBuilding(building)}
            on:workerClick={() => selectBuilding(building)} />
        {:else}
          <div class="h-full bg-beige opacity-75" />
        {/if}
      </PlayerBuildingsLayout>
    </div>
    <div class="h-full flex-1" slot="playerSelector">
      <PlayerTabsLayout players={$currentGameStore.players} let:prop={player}>
        <PlayerTab
          on:click={() => (selectedPlayer = player)}
          userName={player.userName}
          imageUrl={getImageUrl(player)} />
      </PlayerTabsLayout>
    </div>
    <div class="h-full" slot="playerStatistics">
      <PlayerStats
        goods={selectedPlayer.goods}
        doubloons={selectedPlayer.doubloons}
        victoryPoints={selectedPlayer.victoryPoints}
        colonists={selectedPlayer.idleColonistCount} />
    </div>
  </Layout>
</div>
