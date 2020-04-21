<script>
  import Layout from "../../layouts/roles/CraftsmanLayout.svelte";
  import {
    signedInPlayerStore,
    currentActionStore
  } from "../../services/stores";
  import Good from "../../components/Good.svelte";
  import { getContext } from "svelte";
  import { gameHubCtx } from "../../services/contextKeys";
  import { CommandType } from "../../services/gameHub";

  const hub = getContext(gameHubCtx);

  $: goods = $currentActionStore.includes(CommandType.BonusProduction)
    ? $signedInPlayerStore.goods
    : [];

  $: text = $currentActionStore.includes(CommandType.BonusProduction)
    ? "Select to craft one more"
    : "Nothing to see here :(";

  let interactable = false;
  $: interactable = $currentActionStore.includes(CommandType.BonusProduction);
</script>

<Layout {goods} let:prop={good}>
  <Good
    isButton={interactable}
    {good}
    on:click={() => hub.sendCommand(CommandType.BonusProduction, {
        goodType: good.type
      })} />
  <div slot="text">{text}</div>
</Layout>
