<script>
  export let text;
  export let iconUrl;
</script>

<div class="h-full flex flex-row items-center">
  <div class="flex-initial w-6 mx-1 mr-1">
    <img src={iconUrl} alt="" />
  </div>
  <div class="flex-initial">{text}</div>
</div>
