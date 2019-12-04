<script>
  import JSONEditor from "jsoneditor";
  import { onMount } from "svelte";

  export let gameId = "";
  export let options = {
    mode: "code"
  };
  const init = {
    gameId,
    action: {
      actionType: ""
    }
  };

  let container;

  onMount(() => {
    const editor = new JSONEditor(container, options);
    editor.set(init);
  });
</script>

<div bind:this={container} />