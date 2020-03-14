<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import DebugApp from "./debug/DebugApp.svelte";
  import SignInBtn from "./auth/GoogleSignIn.svelte";
  import { sessionStore } from "./services/stores";

  import GameBoard from "./containers/GameBoard.svelte";

  import LoginPage from "./pages/LoginPage.svelte";
  import LobbyPage from "./pages/LobbyPage.svelte";
</script>

<Tailwindcss />

{#if $sessionStore.token}
  {#if $sessionStore.currentGame}
    <GameBoard />
  {:else}
    <LobbyPage />
  {/if}
{:else}
  <LoginPage />
{/if}
