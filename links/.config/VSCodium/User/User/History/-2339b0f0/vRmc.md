---
name: Commands
---

<script>
  import Command from "$lib/components/Command.svelte";

  let commands = [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus"}]
</script>


<Command commands={ [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus"}]} />
