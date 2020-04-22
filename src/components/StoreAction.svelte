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

<div class="flex flex-row justify-center items-center">
  <div class="word">
    <button class="p-1 bg-tobacco text-default border-none hover:bg-coffee" on:click>Prepare</button>
  </div>
  <div class="word">{capacity}</div>
  <div class="word w-6">
    <img src={imgUrl} alt={goodType} />
  </div>
  <div class="word">for</div>
  <div class="word">storing</div>
  <div class="word">in</div>
  <div class="word">{storeName}</div>
</div>
