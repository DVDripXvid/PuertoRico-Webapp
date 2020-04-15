<script>
  export let roles = [];
</script>

<div class="h-full flex flex-row bg-default text-sugar">
  <div class="flex-initial w-1/20">
    <div class="h-full flex flex-col">
      {#each roles as role}
        <div class="flex-1 justify-center">
          <slot prop={role} />
        </div>
      {/each}
    </div>
  </div>

  <div class="flex-auto p-2 flex flex-col">
    <div class="flex-initial">
      <slot name="roleHeader" />
    </div>
    <div class="flex-auto">
      <slot name="roleContent" />
    </div>
  </div>
</div>
