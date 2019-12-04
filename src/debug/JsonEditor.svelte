<script>
  import JSONEditor from "jsoneditor";
  import { onMount } from "svelte";
  import actions from "./gameActions";

  export let gameHub;
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
  let editor;

  onMount(() => {
    editor = new JSONEditor(container, options);
    editor.set(init);
  });

  async function send() {
    const data = editor.get();
    await gameHub.sendCommand(data.action.actionType, gameId, data.action);
  }

  let selectedAction;

  $: editor &&
    editor.set({
      gameId,
      action: selectedAction
    });
</script>

<select bind:value={selectedAction}>
  {#each actions as action}
    <option value={action}>{action.actionType}</option>
  {/each}
</select>
<div bind:this={container} />
<button on:click={send}>Send</button>
