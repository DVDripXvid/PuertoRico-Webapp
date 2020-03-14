<script>
  import { sessionStore } from "../services/stores.js";

  function onClick() {
    console.log($sessionStore);
    sessionStore.set({
      ...$sessionStore,
      currentGame: "bandi",
    });
    console.log($sessionStore);
  }
</script>

<div>Lobby</div>
<button on:click={onClick}>Start game</button>
