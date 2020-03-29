<script>
  import { setContext } from "svelte";
  import GameHub, { EventType } from "./gameHub";
  import { gameHubCtx } from "./contextKeys";

  import {
    lobbyGameStore,
    inProgressGameStore,
    availableActionTypeStore
  } from "./stores";

  export let url;

  const hub = new GameHub(url);
  setContext(gameHubCtx, hub);

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
    lobbyGameStore.update(games => games.filter(g => g.id !== ev.gameId));
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

  hub.on(EventType.GameChanged, ev => {
    inProgressGameStore.update(games =>
      games.some(g => g.id === ev.game.id)
        ? games.map(g => (g.id === ev.game.id ? ev.game : game))
        : [...games, ev.game]
    );
  });

  hub.on(EventType.AvailableActionTypesChanged, ev => {
    availableActionTypeStore.update(availableActionTypesMap => ({
      ...availableActionTypesMap,
      [ev.gameId]: ev.actionTypes
    }));
  });

  hub.on(EventType.Error, ev => console.error(ev));

  Object.keys(EventType).forEach(k =>
    hub.connection.on(k, ev => {
      console.log(k + ": ↴");
      console.log(ev);
    })
  );
</script>

<slot />
