<script>
  import { getContext } from "svelte";
  import {
    sessionStore,
    lobbyGameStore,
    inProgressGameStore
  } from "../services/stores.js";
  import RoleSelector from "../components/RoleSelector.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import RandomColor from "../components/RandomColor.svelte";
  import { gameHubCtx } from "../services/contextKeys";

  const maxPlayerCount = 5;

  const hub = getContext(gameHubCtx);

  function isJoined(game) {
    const userId = $sessionStore.id;
    return game.players.some(p => p.userId === userId);
  }

  function setActiveGame(game){
    sessionStore.update(session => ({
      ...session,
      currentGame: game.id,
    }));
  }
</script>

<!--HEADER-->
<div class="h-full flex flex-col">
  <div
    class="flex flex-row justify-center h-48 bg-cover bg-center text-6xl
    text-sugar font-black"
    style="background-image: url(./img/board.jpg)">
    <div
      class="flex flex-auto justify-center self-center transform translate-x-32">
      LOBBY
    </div>
    <div class="mt-5 mr-5 w-56 z-50">
      <PlayerProfile
        userName={$sessionStore.name}
        imageUrl={$sessionStore.imageUrl} />
    </div>
    <div />
  </div>

  <div class="flex flex-row bg-sugar">

    <!--JOIN GAME-->
    <div class="flex-1 flex flex-col border-2 content-center">
      <div class="flex-initial h-20 text-center bg-corn p-4 text-3xl">
        JOIN GAME
      </div>
      <div class="flex flex-auto p-10">
        <div class="flex-1 flex flex-col">
          {#each $lobbyGameStore as game}
            <div class="flex flex-auto">
              <div
                class="flex flex-auto flex-row bg-default rounded-lg m-3 p-2">
                <div class="flex-1 flex flex-row">
                  {#each game.players as player}
                    <div class="flex-initial text-sugar p-2">
                      {player.userName}
                    </div>
                  {/each}
                  {#each new Array(maxPlayerCount - game.players.length) as slot}
                    <div class="flex-initial text-sugar p-2">Empty slot</div>
                  {/each}
                </div>

                <div class="flex self-end">
                  {#if isJoined(game)}
                    <button
                      class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                      on:click={() => hub.leaveGame(game.id)}>
                      Leave
                    </button>
                    {#if game.players.length >= 3}
                      <button
                        class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                        on:click={() => hub.startGame(game.id)}>
                        Start
                      </button>
                    {/if}
                  {:else}
                    <button
                      class="p-2 m-2 bg-tobacco border-none hover:bg-coffee"
                      on:click={() => hub.joinGame(game.id)}>
                      Join
                    </button>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!--CONTINUE GAME-->
    <div class="flex-1 flex flex-col border-2">
      <div class="h-20 flex-initial text-center bg-corn p-4 text-3xl">
        CONTINUE GAME
      </div>
      <div class="flex-auto p-10">
        <div class="h-full flex flex-col">
          <div
            class="flex-1 flex flex-row flex-start h-20 bg-default rounded-lg
            m-3 p-2">
            {#each $inProgressGameStore as game}
              {#each game.players as player}
                <div class="flex-1 bg-corn m-2 rounded-lg">
                  <PlayerProfile userName={player.userName} imageUrl={player.pictureUrl} />
                </div>
              {/each}
              <div class="flex w-32 self-center justify-end">
                <button on:click={() => setActiveGame(game)} class="p-2 m-2 bg-tobacco border-none hover:bg-coffee">
                  Continue
                </button>
              </div>
            {/each}
          </div>
        </div>
        <div class="h-20 bg-default rounded-lg m-3" />
        <div class="h-20 bg-default rounded-lg m-3" />
      </div>
    </div>
  </div>

  <!--NEW GAME-->
  <div class="flex flex-row h-56 p-10 bg-default">
    <div class="flex flex-auto" />
    <button
      class="self-center text-center text-3xl bg-tobacco border-none
      hover:bg-coffee h-20 w-2/6 rounded-lg transform transition-all
      duration-500 hover:scale-105"
      on:click={() => hub.createGame($sessionStore.name + "'s game")}>
      Create New Game
    </button>
    <div class="flex flex-auto" />
  </div>
</div>

<!-- <RoleSelector
  on:select={event => alert('It works from lobby. Selected: ' + event.detail.roleName)}
  prospectorCount={c} /> -->
