<script>
  import { getContext } from "svelte";
  import Layout from "../../layouts/roles/SettlerLayout.svelte";
  import Tile from "../../components/Tile.svelte";
  import RandomPlantation from "../../components/RandomPlantation.svelte";
  import { currentActionStore, currentGameStore } from "../../services/stores";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  const hub = getContext(gameHubCtx);

  let takePlantationEnabled = false;
  let takeQuarryEnabled = false;
  let takeRandomPlantationEnabled = false;
  $: takePlantationEnabled = $currentActionStore.includes(
    CommandType.TakePlantation
  );
  $: takeQuarryEnabled = $currentActionStore.includes(CommandType.TakeQuarry);
  $: takeRandomPlantationEnabled = $currentActionStore.includes(
    CommandType.TakeRandomPlantation
  );
</script>

<Layout
  plantations={$currentGameStore.visiblePlantations}
  let:prop={plantation}>
  {#if plantation.name}
    <Tile
      isButton={takePlantationEnabled}
      tile={plantation}
      on:click={() => hub.sendCommand(CommandType.TakePlantation, {
          tileIndex: plantation.index
        })} />
  {:else}
    <div class="h-full bg-beige opacity-75" />
  {/if}
  <div class="h-full" slot="hacienda">
    {#if takeRandomPlantationEnabled}
      <RandomPlantation
        on:click={() => hub.sendCommand(CommandType.TakeRandomPlantation)} />
    {/if}
  </div>
  <div slot="quarry">
    {#if $currentGameStore.quarryCount > 0}
      <Tile
        isButton={takeQuarryEnabled}
        tile={{ name: 'Quarry' }}
        on:click={() => hub.sendCommand(CommandType.TakeQuarry)} />
    {/if}
  </div>
  <div slot="quarryCount">
    {$currentGameStore.quarryCount > 0 ? `Left: ${$currentGameStore.quarryCount}` : ''}
  </div>
</Layout>
