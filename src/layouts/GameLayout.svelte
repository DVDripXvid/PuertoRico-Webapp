<script>
  import RandomColor from "../components/RandomColor.svelte";
</script>

<div class="h-full max-h-screen flex flex-col">
  <div class="flex-initial">
    <slot name="infoBar">
      <RandomColor />
    </slot>
  </div>
  <div class="flex-auto">
    <div class="h-full flex flex-row portrait:flex-col-reverse">
      <div class="flex-1">
        <slot name="roleBoard">
          <RandomColor />
        </slot>
      </div>
      <div class="flex-1">
        <slot name="playerBoard">
          <RandomColor />
        </slot>
      </div>
    </div>
  </div>
</div>
