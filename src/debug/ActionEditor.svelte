<script>
  import JSONEditor from "jsoneditor";
  import { onMount } from "svelte";
  import cmds from "./gameActions";

  export let gameHub;
  export let gameId = "";
  export let availableActionTypes = [];
  export let options = {
    mode: "code"
  };
  const init = {};

  let container;
  let editor;

  onMount(() => {
    editor = new JSONEditor(container, options);
    editor.set(init);
  });

  async function send() {
    const data = editor.get();
    await gameHub.sendCommand(selectedCmd.cmd, gameId, data);
  }

  let selectedCmd;
  let availableCmds = [];
  $: { 
    availableCmds = cmds.filter(c => availableActionTypes.includes(c.cmd));
    if(availableCmds.length === 1){
      selectedCmd = availableCmds[0];
    }
  }

  $: editor && selectedCmd && editor.set(selectedCmd.data);
</script>

<select bind:value={selectedCmd}>
  {#each availableCmds as command}
    <option value={command}>{command.cmd}</option>
  {/each}
</select>
<div bind:this={container} />
<button on:click={send}>Send</button>
