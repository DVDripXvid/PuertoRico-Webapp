<script>
  export let roleName;
</script>

<div class="flex flex-row justify-center items-center bg-primary">
  {#if roleName == 'Mayor' || roleName == 'Settler'}
    <div class="flex-initial w-6 p-1">
      <img src={`./img/roles/${roleName}Icon.svg`} alt="*" />
    </div>
  {:else}
    <div class="flex-initial w-6">
      <img src={`./img/roles/${roleName}Icon.svg`} alt="*" />
    </div>
  {/if}
  <div
    class="flex-initial text-center text-text font-minion text-xl tracking-wide
    font-semibold uppercase mx-5">
    {roleName}
  </div>
  {#if roleName == 'Mayor' || roleName == 'Settler' }
    <div class="flex-initial w-6 p-1">
      <img src={`./img/roles/${roleName}Icon.svg`} alt="*" />
    </div>
  {:else}
    <div class="flex-initial w-6">
      <img src={`./img/roles/${roleName}Icon.svg`} alt="*" />
    </div>
  {/if}
</div>
