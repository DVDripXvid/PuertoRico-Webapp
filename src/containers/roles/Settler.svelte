<script>
  import { getContext } from "svelte";
  import Layout from "../../layouts/roles/SettlerLayout.svelte";
  import Tile from "../../components/Tile.svelte";
  import { currentActionStore, currentGameStore } from "../../services/stores";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  const hub = getContext(gameHubCtx);

  let interactable = false;
  $: interactable =
    $currentActionStore.includes(CommandType.TakePlantation) ||
    $currentActionStore.includes(CommandType.TakeQuarry) ||
    $currentActionStore.includes(CommandType.TakeRandomPlantation);
</script>

<Layout
  plantations={$currentGameStore.visiblePlantations}
  let:prop={plantation}>
  {#if plantation.name}
    <Tile
      isButton={interactable}
      tile={plantation}
      on:click={() => hub.sendCommand(CommandType.TakePlantation, {
          tileIndex: plantation.index
        })} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
  <div slot="quarry">
    <Tile
      isButton={interactable}
      tile={{ name: 'Quarry' }}
      on:click={() => hub.sendCommand(CommandType.TakeQuarry)} />
  </div>
</Layout>
