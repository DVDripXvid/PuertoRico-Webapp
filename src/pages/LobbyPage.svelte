<script>
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import {
    sessionStore,
    lobbyGameStore,
    inProgressGameStore
  } from "../services/stores.js";
  import RoleSelector from "../components/RoleSelector.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import LoadingScreen from "../components/LoadingScreen.svelte";
  import Overlay from "../components/Overlay.svelte";
  import GameEndScreen from "../components/GameEndScreen.svelte";
  import { lobbyHubCtx } from "../services/contextKeys";

  const maxPlayerCount = 5;

  const hub = getContext(lobbyHubCtx);
  let isLoading = !hub.connection.connectionStarted;
  hub.start.then(() => (isLoading = false));
  hub.onreconnecting(() => (isLoading = true));
  hub.onreconnected(() => (isLoading = false));

  function isJoined(game) {
    const userId = $sessionStore.id;
    return game.players.some(p => p.userId === userId);
  }

  function setActiveGame(game) {
    sessionStore.update(session => ({
      ...session,
      currentGame: game.id,
      showLobby: false
    }));
  }

  let results = null;

  $: sortedGames = $inProgressGameStore.slice().reverse();
</script>

<!--HEADER-->
<div transition:slide class="h-full flex flex-col min-h-0">
  <div
    class="flex flex-row justify-between bg-cover bg-center"
    style="background-image: url(./img/misc/LobbyHeader.svg)">
    <div class="p-2 w-1/8">
      <PlayerProfile
        username={$sessionStore.name}
        imageUrl={$sessionStore.imageUrl} />
    </div>
    {#if isLoading}
      <div class="p-2 w-1/10">
        <LoadingScreen />
      </div>
    {/if}
  </div>

  <div class="flex-auto flex flex-row portrait:flex-col bg-sugar min-h-0">

    <!--JOIN GAME-->
    <div
      class="flex-1 flex flex-col border-2 border-primary content-center min-h-0">
      <div>
        <img src="img/misc/JoinGame.svg" alt="join" />
      </div>
      <div class="flex-auto flex flex-col p-p2 overflow-y-auto">
        {#each $lobbyGameStore as game}
          <div
            class="flex flex-row items-center bg-default rounded-lg m-p1 p-p2">
            <div class="flex-1 flex flex-row">
              {#each game.players as player}
                <div class="flex-auto min-w-3 p-p2">
                  <PlayerProfile
                    username={player.username}
                    imageUrl={player.pictureUrl} />
                </div>
              {/each}
              {#each new Array(maxPlayerCount - game.players.length) as slot}
                <div class="flex-auto text-sugar min-w-3 p-p2">
                  <img src="img/misc/EmptySlot.svg" alt="EmptySlot" />
                </div>
              {/each}
            </div>
            <div class="flex self-center">
              {#if isJoined(game)}
                <button
                  class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                  on:click|stopPropagation={() => hub.leaveGame(game.id)}>
                  Leave
                </button>
                {#if game.players.length >= 3}
                  <button
                    class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                    on:click|stopPropagation={() => hub.startGame(game.id)}>
                    Start
                  </button>
                {/if}
              {:else}
                <button
                  class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                  on:click|stopPropagation={() => hub.joinGame(game.id)}>
                  Join
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!--LAUNCH GAME-->
    <div class="flex-1 flex flex-col border-2 border-primary min-h-0">
      <div>
        <img src="img/misc/YourGames.svg" alt="launch" />
      </div>
      <div class="h-full flex flex-col overflow-y-auto p-p2">
        {#each sortedGames as game}
          <div class="flex flex-row flex-start bg-default rounded-lg m-p1 p-p2">
            {#each game.players as player}
              <div class="flex-auto min-w-3 text-sugar p-p2">
                <PlayerProfile
                  username={player.username}
                  imageUrl={player.pictureUrl} />
              </div>
            {/each}
            <div class="flex w-32 self-center justify-end">
              {#if game.status === 'RUNNING'}
                <button
                  on:click|stopPropagation={() => setActiveGame(game)}
                  class="p-2 m-2 bg-tobacco border-none hover:bg-coffee">
                  Launch
                </button>
              {:else if game.status === 'ENDED'}
                <button
                  on:click|stopPropagation={() => (results = game.results)}
                  class="p-2 m-2 bg-tobacco border-none hover:bg-coffee">
                  Results
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!--NEW GAME-->
  <div class="flex flex-row justify-center bg-default">
    <div
      class="w-1/12 p-p2 min-w-6 self-center transform transition-all
      duration-500 hover:-translate-x-1/2">
      <img src="img/misc/ShipL.svg" alt="*" />
    </div>
    <div
      class="cursor-pointer w-1/6 p-p2 transform min-w-12 transition-all
      duration-500 scale-90 hover:scale-100"
      on:click|stopPropagation={() => hub.createGame($sessionStore.name + "'s game")}>
      <img src="img/misc/NewGameButton.svg" alt="New Game" />
    </div>
    <div
      class="w-1/12 p-p2 min-w-6 self-center transform transition-all
      duration-500 hover:translate-x-1/2">
      <img src="img/misc/ShipR.svg" alt="*" />
    </div>
  </div>
</div>

{#if results && results.length > 0}
  <Overlay on:cancel={() => (results = null)}>
    <GameEndScreen gameResults={results} />
  </Overlay>
{/if}
