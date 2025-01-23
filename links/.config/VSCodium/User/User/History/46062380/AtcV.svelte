<script>
	import { onMount } from "svelte";

  let tasks = $state([]);


  function addTask(e) {
    if(e.key !== "Enter") return;
    tasks = [...tasks, { value: e.target.value, checked: false }];
    e.target.value = ''
  }
</script>

<input class="px-" type="text" onkeydown={addTask}>
<div class="flex flex-col gap-4">
  {#each tasks as task}
    <div class="flex flex-row gap-2">
      <input type="checkbox" bind:value={task.checked}>
      <p>{task.value}</p>
    </div>
  {/each}
</div>
