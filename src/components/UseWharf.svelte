<script>
  export let goodType;

  $: imgUrl = `./img/goods/${goodType}.svg`;
</script>

<style>
  .word {
    @apply flex-initial m-1;
  }
</style>

<div class="flex flex-row justify-center">
  <div class="word">
    <button class="p-2 m-2 bg-tobacco border-none hover:bg-coffee" on:click>
      Ship all
    </button>
  </div>
  <div class="word w-6">
    <img src={imgUrl} alt={goodType} />
  </div>
  <div class="word">using</div>
  <div class="word">your</div>
  <div class="word">wharf</div>
</div>
