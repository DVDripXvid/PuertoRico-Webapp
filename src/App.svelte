<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import DebugApp from "./debug/DebugApp.svelte";
  import SignInBtn from "./auth/GoogleSignIn.svelte";
  import { sessionStore } from "./services/stores";
  import PlayerBoard from "./containers/PlayerBoard.svelte";
</script>

<Tailwindcss />
<PlayerBoard />
<!--main>
  {#if $sessionStore.token}
    <DebugApp />
  {:else}
    <SignInBtn />
  {/if}
</main-->
