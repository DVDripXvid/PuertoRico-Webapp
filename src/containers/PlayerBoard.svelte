<script>
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/PlayerBoard/PlayerTilesLayout.svelte";
  import PlayerBuildingLayout from "../layouts/PlayerBoard/PlayerBuildingsLayout.svelte";
  import PlayerTabsLayout from "../layouts/PlayerBoard/PlayerTabsLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
  import SmallIndigoPlant from "../components/buildings/SmallIndigoPlant.svelte";

  import { sessionStore } from "../services/stores.js";
</script>

<div
  class="h-full bg-no-repeat bg-cover"
  style="background-image: url(./img/board.jpg)">
  <Layout>
    <div class="h-full" slot="playerProfile">
      <PlayerProfile
        userName={$sessionStore.name}
        imageUrl={$sessionStore.imageUrl} />
    </div>
    <div class="h-full" slot="playerTiles">
      <PlayerTilesLayout let:prop={tile}>
        {#if tile.type}
          <div>{tile.type}</div>
        {:else}
          <div class="h-full bg-beige opacity-75" />
        {/if}
      </PlayerTilesLayout>
    </div>
    <div class="h-full" slot="playerBuildings">
      <PlayerBuildingLayout items={[{type: 'SmallIndigoPlant'}]} let:prop={building}>
        {#if building.type}
          <SmallIndigoPlant />
        {:else}
          <div class="h-full bg-beige opacity-75" />
        {/if}
      </PlayerBuildingLayout>
    </div>
    <div class="h-full" slot="playerSelector">
      <PlayerTabsLayout players={[...Array(4).keys()]} />
    </div>
  </Layout>
</div>
