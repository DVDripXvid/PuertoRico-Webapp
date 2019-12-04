<script>
  import { LogLevel } from "@microsoft/signalr";
  import GameHub, { EventType } from "./services/gameHub";
  import JSONEditor from "./debug/JsonEditor.svelte";

  const hub = new GameHub(
    "http://localhost:5000/game?user=devUser1",
    true,
    LogLevel.Debug
  );

</script>

<main>
  <JSONEditor />
</main>
