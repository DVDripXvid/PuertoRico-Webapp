<script>
  import GameLayout from "../layouts/GameLayout.svelte";
  import PlayerBoard from "./PlayerBoard.svelte";
  import RoleSelectorLayout from "../layouts/RoleSelectorLayout.svelte";
</script>

<GameLayout>
  <div class="h-full" slot="playerBoard">
    <PlayerBoard />
  </div>
  <div class="h-full" slot="roleSelector">
    <RoleSelectorLayout roles={[...Array(7).keys()]} />
  </div>
</GameLayout>
