<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import DebugApp from "./debug/DebugApp.svelte";
  import SignInBtn from "./auth/GoogleSignIn.svelte";
  import { sessionStore } from "./services/stores";
  import GameHubProvider from "./services/GameHubProvider.svelte";

  import GameBoard from "./containers/GameBoard.svelte";

  import LoginPage from "./pages/LoginPage.svelte";
  import LobbyPage from "./pages/LobbyPage.svelte";
</script>

<Tailwindcss />

{#if $sessionStore.token}
  <GameHubProvider url={"http://localhost:5000/game"}>
    {#if $sessionStore.currentGame}
      <GameBoard />
    {:else}
      <LobbyPage />
    {/if}
  </GameHubProvider>
{:else}
  <LoginPage />
{/if}
