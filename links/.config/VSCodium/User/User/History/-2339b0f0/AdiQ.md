---
name: Commands
---

<script>
  import Commands from "$lib/components/Commands.svelte";

  let commands = [{name:'npm', command:"npm install angus"}, {name:'pnpm', command:"pnpm install angus"}, {name:'bun', command:"bun add angus && bun add angus && bun add angus && bun add angus"}]
</script>


You can use the `Commands` component imported from `$lib/components`. Pass it an array of 

<Commands commands={commands} />
