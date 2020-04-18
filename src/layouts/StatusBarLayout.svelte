<div class="flex flex-row portrait:flex-col">
  <div class="hidden h-full flex-initial portrait:flex portrait:flex-row justify-between">
    <div class="flex-initial">
      <slot name="actionLeft" />
    </div>
    <div class="flex-initial">
      <slot name="actionRight" />
    </div>
  </div>
  <div class="flex-initial portrait:hidden">
    <slot name="actionLeft" />
  </div>
  <div class="flex-auto">
    <slot name="statistics" />
  </div>
  <div class="flex-initial portrait:hidden">
    <slot name="actionRight" />
  </div>
</div>
