<script>
  import Layout from "../layouts/PlayerBoardLayout.svelte";
  import PlayerTilesLayout from "../layouts/PlayerBoard/PlayerTilesLayout.svelte";
  import PlayerBuildingLayout from "../layouts/PlayerBoard/PlayerBuildingsLayout.svelte";
  import PlayerSelectorLayout from "../layouts/PlayerBoard/PlayerSelectorLayout.svelte";
  import PlayerProfile from "../components/PlayerProfile.svelte";
</script>

<div
  class="h-full bg-no-repeat bg-cover"
  style="background-image: url(./img/board.jpg)">
  <Layout>
    <div class="h-full" slot="playerProfile">
      <PlayerProfile />
    </div>
    <div class="h-full" slot="playerTiles">
      <PlayerTilesLayout />
    </div>
    <div class="h-full" slot="playerBuildings">
      <PlayerBuildingLayout />
    </div>
    <div class="h-full" slot="playerSelector">
      <PlayerSelectorLayout players={[...Array(4).keys()]} />
    </div>
  </Layout>
</div>
