<script>
  export let message;
</script>

<div
  on:click|stopPropagation
  class="h-full flex flex-row items-center justify-center bg-coffee
  cursor-pointer text-sugar">
  <div>{message}</div>
</div>
