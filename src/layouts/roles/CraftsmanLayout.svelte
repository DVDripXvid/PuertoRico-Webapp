<script>
  import { removeDuplicates } from "../../services/utils";
  export let goods = [];

  $: producable = removeDuplicates(goods, "type");
</script>

<div class="h-full flex flex-col">
  <div class="flex-1 flex flex-row justify-center items-end">
    {#each producable as good}
      <div class="flex-1 max-w-1/3 m-2">
        <slot prop={good} />
      </div>
    {/each}
  </div>
  <div class="flex-1 text-center">
    <slot name="text" />
  </div>
</div>
