<script>
  export let goodType;
  export let price;

  $: imgUrl = `./img/goods/${goodType}.svg`;
</script>

<style>
  .word {
    @apply flex-initial m-1;
  }
</style>

<div class="flex flex-row">
  <div class="word">
    <button on:click>Sell</button>
  </div>
  <div class="word w-6">
    <img src={imgUrl} alt={goodType} />
  </div>
  <div class="word">for</div>
  <div class="word">{price}</div>
  <div class="word">doubloon(s)</div>
</div>
