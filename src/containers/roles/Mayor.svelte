<script>
  import { currentGameStore } from "../../services/stores";
  import Text from "../../components/RolesideText.svelte";

  let mayorPlayer = $currentGameStore.players.find(
    p => p.role && p.role.name === "Mayor"
  );
</script>

<div>
  <div class="h-full p-4">
    <img src="img/misc/MayorShip.svg" alt="" />
  </div>
  {#if mayorPlayer && $currentGameStore.currentRole && $currentGameStore.currentRole.name === 'Mayor'}
    <div class="mt-5">
      <Text text={`${mayorPlayer.username} is bringing the freshly recruited colonists.`}></Text>
    </div>
  {:else}
    <div class="mt-5">
      <Text text={$currentGameStore.colonistShip.colonistCount} size={3}></Text>
      <Text text={"colonists are waiting..."}></Text>
    </div>
  {/if}
</div>
