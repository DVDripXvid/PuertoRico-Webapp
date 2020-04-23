<div class="h-full flex flex-col">
  <div class="flex-auto">
    <div class="h-full flex flex-row">
      <div class="flex-auto">
        <div class="h-full flex flex-col">
          <div class="flex-1">
            <div class="h-full flex flex-row m-3">
              <div class="flex-auto">
                <slot name="playerTiles" />
              </div>
              <div class="flex-initial w-1/4">
                <slot name="playerProfile" />
              </div>
            </div>
            <div />
          </div>
          <div class="flex-1 m-3">
            <slot name="playerBuildings" />
          </div>
        </div>
      </div>
      <div class="flex-initial flex justify-center w-1/6">
        <slot name="playerSelector" />
      </div>
    </div>
  </div>
  <div class="flex-initial">
    <slot name="playerStatistics" />
  </div>
</div>
