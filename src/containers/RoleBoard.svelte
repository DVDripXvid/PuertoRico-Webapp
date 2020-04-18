<script>
  import Layout from "../layouts/RoleBoardLayout.svelte";
  import Builder from "./roles/Builder.svelte";
  import Captain from "./roles/Captain.svelte";
  import Craftsman from "./roles/Craftsman.svelte";
  import Mayor from "./roles/Mayor.svelte";
  import Settler from "./roles/Settler.svelte";
  import Trader from "./roles/Trader.svelte";
  import RoleTab from "../components/RoleTab.svelte";
  import { currentGameStore } from "../services/stores";

  let tabs = [
    {
      name: "Builder",
      component: Builder
    },
    {
      name: "Captain",
      component: Captain
    },
    {
      name: "Craftsman",
      component: Craftsman
    },
    {
      name: "Mayor",
      component: Mayor
    },
    {
      name: "Settler",
      component: Settler
    },
    {
      name: "Trader",
      component: Trader
    }
  ];

  $: selectedTab = $currentGameStore.currentRole
    ? tabs.find(t => t.name === $currentGameStore.currentRole.name)
    : tabs[0];
</script>

<div class="h-full bg-corn">
  <Layout roles={tabs} let:prop={tab}>
    {#if selectedTab !== tab}
      <RoleTab name={tab.name} on:click={() => (selectedTab = tab)} />
    {/if}
    <div class="h-10" slot="roleHeader">{selectedTab.name}</div>
    <div class="h-full" slot="roleContent">
      <svelte:component this={selectedTab.component} />
    </div>
  </Layout>
</div>
