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

<div class="flex flex-row justify-center items-center">
  <button
    class="flex-auto p-1 mr-3 bg-tobacco border-none hover:bg-coffee"
    on:click>
    Sell
  </button>
  <div class="word w-6">
    <img src={imgUrl} alt={goodType} />
  </div>
  <div class="word">for</div>
  <div class="word">{price}</div>
  <div class="flex_initial flex flex-row">
    doubloon
    {#if price >= 2}
      <div class="flex-initial">s</div>
    {/if}
  </div>
</div>
