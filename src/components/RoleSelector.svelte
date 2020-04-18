<script>
  import Role from "../components/Role.svelte";

  import { createEventDispatcher } from "svelte";

  export let selectableRoles = [];

  const dispatch = createEventDispatcher();
</script>

<div class="h-full flex flex-row">
  {#each selectableRoles as role}
    <div class="flex-1 h-full p-1 flex flex-col">
      <div class="flex-auto" on:click|stopPropagation={() => dispatch('select', role)}>
        <Role {role} />
      </div>
      <div class="flex-initial self-center text-corn">{role.doubloons}</div>
    </div>
  {/each}
</div>
