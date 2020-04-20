<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import DebugApp from "./debug/DebugApp.svelte";
  import SignInBtn from "./auth/GoogleSignIn.svelte";
  import { sessionStore } from "./services/stores";
  import { getConfig } from "./config";
  import LobbyHubProvider from "./services/LobbyHubProvider.svelte";
  import GameHubProvider from "./services/GameHubProvider.svelte";

  import GamePage from "./pages/GamePage.svelte";
  import LoginPage from "./pages/LoginPage.svelte";
  import LobbyPage from "./pages/LobbyPage.svelte";

  const config = getConfig();
</script>

<Tailwindcss />

{#if $sessionStore.token}
  {#if $sessionStore.showLobby}
    <LobbyHubProvider url={config.hubUrl}>
      <LobbyPage />
    </LobbyHubProvider>
  {:else}
    <GameHubProvider>
      <GamePage />
    </GameHubProvider>
  {/if}
{:else}
  <LoginPage />
{/if}
