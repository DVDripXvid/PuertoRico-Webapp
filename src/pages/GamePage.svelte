<script>
  import { getContext } from "svelte";
  import GameLayout from "../layouts/GameLayout.svelte";
  import StatusBarLayout from "../layouts/StatusBarLayout.svelte";
  import PlayerBoard from "../containers/PlayerBoard.svelte";
  import RoleBoard from "../containers/RoleBoard.svelte";
  import GameStats from "../components/GameStats.svelte";
  import RoleSelector from "../components/RoleSelector.svelte";
  import Overlay from "../components/Overlay.svelte";
  import Button from "../components/ButtonWithIcon.svelte";
  import TextWithIcon from "../components/TextWithIcon.svelte";
  import { CommandType } from "../services/gameHub";
  import { gameHubCtx } from "../services/contextKeys";
  import {
    currentGameStore,
    currentActionStore,
    sessionStore
  } from "../services/stores";

  $: isSelecRole = $currentActionStore.includes(CommandType.SelectRole);

  let isOverlayOpen = true;

  $: isSelectRoleVisible = isSelecRole && isOverlayOpen;

  const hub = getContext(gameHubCtx);
</script>

<GameLayout>
  <div class="bg-stats" slot="infoBar">
    <StatusBarLayout>
      <div class="h-full" slot="actionLeft">
        <Button
          on:click={() => sessionStore.update(s => ({ ...s, showLobby: true }))}
          iconUrl="img/misc/ToLobbyIcon.svg"
          text="To Lobby" />
      </div>
      <div class="h-full" slot="actionRight">
        {#if $currentActionStore.includes(CommandType.EndPhase)}
          <Button
            on:click={() => hub.sendCommand(CommandType.EndPhase)}
            iconUrl="img/misc/EndTurnIcon.svg"
            text="End Turn"
            reverse={true} />
        {:else if isSelecRole}
          <Button
            on:click={() => (isOverlayOpen = true)}
            iconUrl="img/misc/EndTurnIcon.svg"
            text="Choose role"
            reverse={true} />
        {/if}
      </div>
      <div class="h-full" slot="currentRole">
        {#if $currentGameStore.currentRole}
          <TextWithIcon
            text={$currentGameStore.currentRole.name}
            iconUrl={`./img/roles/${$currentGameStore.currentRole.name}.svg`} />
        {/if}
      </div>
      <div slot="statistics">
        <GameStats
          colonists={$currentGameStore.colonistsCount}
          victoryPoints={$currentGameStore.victoryPoints}
          corn={$currentGameStore.cornCount}
          indigo={$currentGameStore.indigoCount}
          sugar={$currentGameStore.sugarCount}
          tobacco={$currentGameStore.tobaccoCount}
          coffee={$currentGameStore.coffeeCount} />
      </div>
    </StatusBarLayout>
  </div>
  <div class="h-full" slot="playerBoard">
    <PlayerBoard />
  </div>
  <div class="h-full" slot="roleBoard">
    <RoleBoard />
  </div>
</GameLayout>

{#if isSelectRoleVisible}
  <Overlay on:cancel={() => (isOverlayOpen = false)}>
    <RoleSelector
      selectableRoles={$currentGameStore.selectableRoles}
      on:select={ev => hub.sendCommand(CommandType.SelectRole, {
          roleIndex: ev.detail.index
        })} />
  </Overlay>
{/if}
