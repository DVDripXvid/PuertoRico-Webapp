<script>
  import Role from "../components/Role.svelte";

  import { createEventDispatcher } from "svelte";

  export let selectableRoles = [];

  const dispatch = createEventDispatcher();
</script>

<div class="h-full flex flex-row">
  {#each selectableRoles as role}
    <div class="flex-1 h-full p-1" on:click={() => dispatch('select', role)}>
      <Role {role} />
    </div>
  {/each}
</div>
