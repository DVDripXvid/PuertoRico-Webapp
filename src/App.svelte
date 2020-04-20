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

  let gameLoaded = false;
  $: gameLoaded = $sessionStore.showLobby ? false : gameLoaded;
</script>

<Tailwindcss />

{#if $sessionStore.token}
  {#if $sessionStore.showLobby || !gameLoaded}
    <LobbyHubProvider url={config.hubUrl}>
      <LobbyPage />
    </LobbyHubProvider>
  {/if}
  {#if !$sessionStore.showLobby}
    <GameHubProvider
      on:failure={() => sessionStore.update(s => ({ ...s, showLobby: true }))}
      on:ready={() => (gameLoaded = true)}>
      {#if gameLoaded}
        <GamePage />
      {/if}
    </GameHubProvider>
  {/if}
{:else}
  <LoginPage />
{/if}
