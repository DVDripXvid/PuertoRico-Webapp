<script>
  export let goodType;
  export let storeName;
  export let capacity;

  $: imgUrl = `./img/goods/${goodType}.svg`;
</script>

<style>
  .word {
    @apply flex-initial m-1;
  }
</style>

<div class="flex flex-row justify-center">
  <div class="word">
    <button on:click>Remove {capacity}</button>
  </div>
  <div class="word w-6">
    <img src={imgUrl} alt={goodType} />
  </div>
  <div class="word">from</div>
  <div class="word">{storeName}</div>
</div>
