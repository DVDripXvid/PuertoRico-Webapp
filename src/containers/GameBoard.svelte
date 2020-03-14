<script>
  import GameLayout from "../layouts/GameLayout.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";
  import RoleTabsLayout from "../layouts/RoleTabsLayout.svelte";
</script>

<GameLayout>
  <div class="h-full" slot="playerBoard">
    <PlayerBoard />
  </div>
  <div class="h-full" slot="roleSelector">
    <RoleTabsLayout roles={[...Array(7).keys()]} />
  </div>
</GameLayout>
