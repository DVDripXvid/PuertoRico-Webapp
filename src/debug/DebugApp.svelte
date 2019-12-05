<script>
  import ActionEditor from "./ActionEditor.svelte";
  import JSONEditor from "jsoneditor";
  import { LogLevel } from "@microsoft/signalr";
  import { onMount } from "svelte";
  import GameHub, { EventType } from "../services/gameHub";

  let userName;
  let hub;
  let gameId;
  let gameName;
  let players = [];
  let game;

  async function connect() {
    hub = new GameHub(
      "http://localhost:5000/game?user=" + userName,
      true,
      LogLevel.Debug
    );

    Object.keys(EventType).forEach(k =>
      hub.connection.on(k, ev => console.log(ev))
    );

    hub.connection.on(EventType.GameCreated, ev => {
      gameId = ev.gameId;
      players = ev.players;
    });

    hub.connection.on(EventType.PlayerJoined, ev => {
      players.push(ev.player);
      players = players;
    });

    hub.connection.on(EventType.GameChanged, ev => {
      game = ev.game;
      gameId = ev.game.id;
    });

    setInterval(() => connectionState = hub.connection.connectionState, 1000);
    hub.connection.onclose(err => console.error(err));
  }

  let connectionState = "Disconnected";

  let container;
  let editor;

  $: {
    if (game) {
      if (!editor) {
        editor = new JSONEditor(container, {});
      }
      editor.set(game);
    }
  }
</script>

<style>
  .horizontalPanel {
    height: 100%;
    width: 40%;
    vertical-align: top;
    display: inline-block;
  }
</style>

{#if game}
  <div class="horizontalPanel">
    <ActionEditor gameHub={hub} {gameId} />
  </div>
{:else}
  <div>
    <input bind:value={userName} placeholder="userId" />
    <button on:click={connect}>Connect</button>
    <label>{connectionState}</label>
    <input bind:value={gameName} placeholder="game name to create" />
    <button on:click={() => hub.createGame(gameName)}>Create</button>
    <input bind:value={gameId} placeholder="gameId to join" />
    <button on:click={() => hub.joinGame(gameId)}>Join</button>
    <h4>Players:</h4>
    <ul>
      {#each players as p}
        <li>{p.userName}</li>
      {/each}
    </ul>
    {#if players.length >= 3}
      <button on:click={() => hub.startGame(gameId)}>Start</button>
    {/if}
  </div>
{/if}
<div bind:this={container} class="horizontalPanel" />
