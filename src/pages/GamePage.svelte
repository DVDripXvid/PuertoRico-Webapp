<script>
  import { getContext } from "svelte";
  import GameLayout from "../layouts/GameLayout.svelte";
  import PlayerBoard from "../containers/PlayerBoard.svelte";
  import RoleBoard from "../containers/RoleBoard.svelte";
  import RoleSelector from "../components/RoleSelector.svelte";
  import Overlay from "../components/Overlay.svelte";
  import { CommandType } from "../services/gameHub";
  import { gameHubCtx } from "../services/contextKeys";
  import {
    currentGameStore,
    currentActionStore
  } from "../services/stores";

  $: isSelecRole = $currentActionStore.includes(CommandType.SelectRole);

  const hub = getContext(gameHubCtx);
</script>

<GameLayout>
  <div class="h-full" slot="playerBoard">
    <PlayerBoard
      players={$currentGameStore.players}
      role={$currentGameStore.currentRole}
      availableActions={$currentActionStore} />
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
