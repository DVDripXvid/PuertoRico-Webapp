<script>
  import { setContext, onDestroy } from "svelte";
  import lobbyHub, { EventType } from "./lobbyHub";
  import { lobbyHubCtx } from "./contextKeys";
  import { signIn } from "../auth/GoogleSignIn.svelte";
  import Overlay from "../components/Overlay.svelte";
  import SessionExpiredScreen from "../components/SessionExpiredScreen.svelte";

  import {
    lobbyGameStore,
    inProgressGameStore,
    availableActionTypeStore
  } from "./stores";

  export let url;
  let showSessionExpired = false;

  const hub = new lobbyHub(url);
  hub.start.catch(err => {
    console.error(err);
    if (err.message === "Unauthorized") {
      showSessionExpired = true;
    }
  });
  setContext(lobbyHubCtx, hub);

  onDestroy(() => hub.stop());

  function refresh() {
    signIn().then(() => {
      showSessionExpired = false;
      hub.restart();
    });
  }

  hub.on(EventType.GameCreated, ev => {
    lobbyGameStore.update(games =>
      games.some(g => g.id === ev.gameId)
        ? games
        : [
            ...games,
            {
              id: ev.gameId,
              name: ev.gameName,
              players: ev.players
            }
          ]
    );
  });

  hub.on(EventType.GameStarted, ev => {
    lobbyGameStore.update(games => games.filter(g => g.id !== ev.game.id));
    inProgressGameStore.update(games =>
      games.some(g => g.id === ev.game.id)
        ? games.map(g => (g.id === ev.game.id ? { ...ev.game, ...g } : g))
        : [...games, ev.game]
    );
  });

  hub.on(EventType.GameDestroyed, ev => {
    lobbyGameStore.update(games => games.filter(g => g.id !== ev.gameId));
  });

  hub.on(EventType.PlayerJoined, ev => {
    lobbyGameStore.update(games =>
      games.map(g =>
        g.id === ev.gameId
          ? {
              ...g,
              players: [...g.players, ev.player]
            }
          : g
      )
    );
  });

  hub.on(EventType.PlayerLeft, ev => {
    lobbyGameStore.update(games =>
      games.map(g =>
        g.id === ev.gameId
          ? {
              ...g,
              players: g.players.filter(p => p.userId !== ev.player.userId)
            }
          : g
      )
    );
  });

  hub.on(EventType.GameEnded, ev => {
    inProgressGameStore.update(games =>
      games.map(g => (g.id === ev.gameId ? { ...g, results: ev.results } : g))
    );
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

<slot />
{#if showSessionExpired}
  <Overlay>
    <SessionExpiredScreen on:click={refresh} />
  </Overlay>
{/if}
