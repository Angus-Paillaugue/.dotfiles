---
name: Commands
---

<script>
  import Command from "$lib/components/Command.svelte";

  let commands = [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus && bun add angus && bun add angus && bun add angus"}]
</script>


<Command commands={commands} />
