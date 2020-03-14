<script>
  import RandomColor from "../components/RandomColor.svelte";
</script>

<div class="h-full flex flex-col">
  <div class="flex-auto">
    <div class="h-full flex flex-row">
      <div class="flex-auto">
        <div class="h-full flex flex-col">
          <div class="flex-1">
            <div class="h-full flex flex-row m-3">
              <div class="flex-auto">
                <slot name="playerTiles">
                  <RandomColor />
                </slot>
              </div>
              <div class="flex-initial w-48">
                <slot name="playerProfile">
                  <RandomColor />
                </slot>
              </div>
            </div>
            <div />
          </div>
          <div class="flex-1 m-3">
            <slot name="playerBuildings">
              <RandomColor />
            </slot>
          </div>
        </div>
      </div>
      <div class="flex-initial w-10">
        <slot name="playerSelector">
          <RandomColor />
        </slot>
      </div>
    </div>
  </div>
  <div class="flex-initial h-10">
    <slot name="playerStatistics">
      <RandomColor />
    </slot>
  </div>
</div>
