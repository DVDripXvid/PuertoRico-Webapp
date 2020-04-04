<script>
  import { getContext } from "svelte";
  import Layout from "../../layouts/roles/SettlerLayout.svelte";
  import Tile from "../../components/Tile.svelte";
  import { currentActionStore, currentGameStore } from "../../services/stores";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  const hub = getContext(gameHubCtx);
</script>

<Layout
  plantations={$currentGameStore.visiblePlantations}
  let:prop={plantation}>
  {#if plantation.name}
    <Tile
      tile={plantation}
      on:click={() => hub.sendCommand(CommandType.TakePlantation, {
          tileIndex: plantation.index
        })} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
  <div slot="quarry">
    <Tile
      tile={{ name: 'Quarry' }}
      on:click={() => hub.sendCommand(CommandType.TakeQuarry)} />
  </div>
</Layout>
