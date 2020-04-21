<script>
  import { setContext, onDestroy, createEventDispatcher } from "svelte";
  import GameHub, { EventType } from "./gameHub";
  import { gameHubCtx } from "./contextKeys";
  import Overlay from "../components/Overlay.svelte";
  import LoadingScreen from "../components/LoadingScreen.svelte";
  import GameEndScreen from "../components/GameEndScreen.svelte";

  import {
    lobbyGameStore,
    inProgressGameStore,
    currentGameStore,
    availableActionTypeStore
  } from "./stores";

  const dispatch = createEventDispatcher();
  const minLoadingScreenTime = 2000;

  let gameEnded = false;
  let results = {};

  let isShowGame = false;
  let isShowLoading = true;
  let loadingPromise = new Promise(resolve =>
    setTimeout(resolve, minLoadingScreenTime)
  );

  function showLoading() {
    isShowLoading = true;
    loadingPromise = new Promise(resolve =>
      setTimeout(resolve, minLoadingScreenTime)
    );
  }

  function hideLoading() {
    loadingPromise.then(() => {
      isShowLoading = false;
    });
  }

  const hub = new GameHub();
  setContext(gameHubCtx, hub);
  onDestroy(() => hub.stop());

  const unsubscribe = currentGameStore.subscribe(game => {
    if (hub.connection || !game.id || !game.endpoint) return;
    hub.start(game.endpoint, game.id).catch(() => dispatch("failure"));
    hub.connection.onreconnecting(showLoading);
    hub.connection.onreconnected(hideLoading);
    hub.connection.onclose(() => dispatch("failure"));
    hub.start;

    hub.on(EventType.GameChanged, ev => {
      inProgressGameStore.update(games =>
        games.some(g => g.id === ev.game.id)
          ? games.map(g => (g.id === ev.game.id ? ev.game : g))
          : [...games, ev.game]
      );
      isShowGame = true;
      hideLoading();
      dispatch("ready");
    });

    hub.on(EventType.AvailableActionTypesChanged, ev => {
      availableActionTypeStore.update(availableActionTypesMap => ({
        ...availableActionTypesMap,
        [ev.gameId]: ev.actionTypes
      }));
    });

    hub.on(EventType.GameEnded, ev => {
      gameEnded = true;
      results = ev.results;
    });

    hub.on(EventType.Error, ev => {
      console.error(ev);
    });

    Object.keys(EventType).forEach(k =>
      hub.connection.on(k, ev => {
        console.log(k + ": ↴");
        console.log(ev);
      })
    );
  });
</script>

{#if isShowGame}
  <slot />
{/if}
{#if isShowLoading}
  <Overlay>
    <LoadingScreen />
  </Overlay>
{/if}
{#if gameEnded}
  <Overlay>
    <GameEndScreen {results} />
  </Overlay>
{/if}
