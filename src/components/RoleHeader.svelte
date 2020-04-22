<script>
  export let roleName;
</script>

<div class="flex flex-row justify-center items-center bg-primary">
  <div class="flex-initial w-6">
    <img src={`./img/roles/${roleName}.svg`} alt="*" />
  </div>
  <div
    class="flex-initial text-center text-text font-minion text-xl tracking-wide
    font-semibold uppercase mx-3">
    {roleName}
  </div>
  <div class="flex-initial w-6">
    <img src={`./img/roles/${roleName}.svg`} alt="*" />
  </div>
</div>
