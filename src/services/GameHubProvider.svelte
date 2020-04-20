<script>
  import { setContext, onDestroy, createEventDispatcher } from "svelte";
  import GameHub, { EventType } from "./gameHub";
  import { gameHubCtx } from "./contextKeys";
  import Overlay from "../components/Overlay.svelte";
  import LoadingScreen from "../components/LoadingScreen.svelte";

  import {
    lobbyGameStore,
    inProgressGameStore,
    currentGameStore,
    availableActionTypeStore
  } from "./stores";

  const dispatch = createEventDispatcher();

  const url = $currentGameStore.endpoint;

  let showGame = false;
  let showLoading = true;
  const hub = new GameHub(url);
  hub.connection.onreconnecting(() => (showLoading = true));
  hub.connection.onreconnected(() => (showLoading = false));
  hub.connection.onclose(() => dispatch("failure"));
  hub.start.catch(() => dispatch("failure"));
  setContext(gameHubCtx, hub);

  onDestroy(() => hub.stop());

  hub.on(EventType.GameChanged, ev => {
    inProgressGameStore.update(games =>
      games.some(g => g.id === ev.game.id)
        ? games.map(g => (g.id === ev.game.id ? ev.game : g))
        : [...games, ev.game]
    );
    showGame = true;
    showLoading = false;
    dispatch("ready");
  });

  hub.on(EventType.AvailableActionTypesChanged, ev => {
    availableActionTypeStore.update(availableActionTypesMap => ({
      ...availableActionTypesMap,
      [ev.gameId]: ev.actionTypes
    }));
  });

  hub.on(EventType.Error, ev => {
    // TODO: notification
    alert(ev.errorMessage);
    console.error(ev);
  });

  Object.keys(EventType).forEach(k =>
    hub.connection.on(k, ev => {
      console.log(k + ": ↴");
      console.log(ev);
    })
  );
</script>

{#if showGame}
  <slot />
{/if}
{#if showLoading}
  <Overlay>
    <LoadingScreen />
  </Overlay>
{/if}
