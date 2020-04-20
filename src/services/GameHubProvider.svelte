<script>
  import { setContext, onDestroy } from "svelte";
  import GameHub, { EventType } from "./gameHub";
  import { gameHubCtx } from "./contextKeys";

  import {
    lobbyGameStore,
    inProgressGameStore,
    currentGameStore,
    availableActionTypeStore
  } from "./stores";

  const url = $currentGameStore.endpoint;

  const hub = new GameHub(url);
  setContext(gameHubCtx, hub);
  let ready = false;

  onDestroy(() => hub.stop());

  hub.on(EventType.GameChanged, ev => {
    ready = true;
    inProgressGameStore.update(games =>
      games.some(g => g.id === ev.game.id)
        ? games.map(g => (g.id === ev.game.id ? ev.game : g))
        : [...games, ev.game]
    );
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

{#if ready}
  <slot />
{/if}
