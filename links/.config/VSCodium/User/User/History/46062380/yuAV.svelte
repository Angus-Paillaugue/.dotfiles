<script>
	import { onMount } from "svelte";

  let tasks = $state([]);


  function addTask(e) {

    tasks = [...tasks, { value: e.tar, checked: false }];
  }
</script>

<div class="flex flex-col gap-4">
  {#each tasks as task}
    <div class="flex flex-row gap-2">
      <input type="checkbox" bind:value={task.checked}>
      <p>{task.value}</p>
    </div>
  {/each}
</div>
