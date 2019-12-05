<script>
  import DebugApp from "./debug/DebugApp.svelte";
  import SignInBtn from "./auth/GoogleSignIn.svelte";
  import { sessionStore } from "./services/stores";
</script>

<main>
  {#if $sessionStore.token}
    <DebugApp />
  {:else}
    <SignInBtn />
  {/if}
</main>
