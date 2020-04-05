<script>
  import { getContext } from "svelte";
  import GameLayout from "../layouts/GameLayout.svelte";
  import PlayerBoard from "../containers/PlayerBoard.svelte";
  import RoleBoard from "../containers/RoleBoard.svelte";
  import GameStats from "../components/GameStats.svelte";
  import RoleSelector from "../components/RoleSelector.svelte";
  import Overlay from "../components/Overlay.svelte";
  import { CommandType } from "../services/gameHub";
  import { gameHubCtx } from "../services/contextKeys";
  import {
    currentGameStore,
    currentActionStore,
    sessionStore
  } from "../services/stores";

  $: isSelecRole = $currentActionStore.includes(CommandType.SelectRole);

  const hub = getContext(gameHubCtx);
</script>

<GameLayout>
  <div slot="infoBar">
    <GameStats
      on:back={() => sessionStore.update(s => ({ ...s, showLobby: true }))}
      on:endTurn={() => hub.sendCommand(CommandType.EndPhase)}
      currentRoleName={$currentGameStore.currentRole ? $currentGameStore.currentRole.name : ""}
      colonists={$currentGameStore.colonistsCount}
      victoryPoints={$currentGameStore.victoryPoints}
      corn={$currentGameStore.cornCount}
      indigo={$currentGameStore.indigoCount}
      sugar={$currentGameStore.sugarCount}
      tobacco={$currentGameStore.tobaccoCount}
      coffee={$currentGameStore.coffeeCount} />
  </div>
  <div class="h-full" slot="playerBoard">
    <PlayerBoard />
  </div>
  <div class="h-full" slot="roleBoard">
    <RoleBoard />
  </div>
</GameLayout>

{#if isSelecRole}
  <Overlay>
    <RoleSelector
      selectableRoles={$currentGameStore.selectableRoles}
      on:select={ev => hub.sendCommand(CommandType.SelectRole, {
          roleIndex: ev.detail.index
        })} />
  </Overlay>
{/if}
