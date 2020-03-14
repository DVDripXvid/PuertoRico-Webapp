<script>
  import RandomColor from "../components/RandomColor.svelte";
</script>

<div class="h-full flex flex-col">
  <div class="flex-initial h-10">
    <slot name="infoBar">
      <RandomColor />
    </slot>
  </div>
  <div class="flex-auto">
    <div class="h-full flex flex-row portrait:flex-col">
      <div class="flex-1">
        <div class="h-full flex flex-row">
          <div class="flex-initial w-10">
            <slot name="roleSelector">
              <RandomColor />
            </slot>
          </div>
          <div class="flex-auto">
            <slot name="roleBoard">
              <RandomColor />
            </slot>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <slot name="playerBoard">
          <RandomColor />
        </slot>
      </div>
    </div>
  </div>
</div>
