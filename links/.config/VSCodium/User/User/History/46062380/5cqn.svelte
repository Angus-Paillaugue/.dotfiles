<script>
	import { backOut } from "svelte/easing";
	import { fly } from "svelte/transition";

  let tasks = $state([]);

  function addTask(e) {
    if(e.key !== "Enter") return;
    tasks = [...tasks, { value: e.target.value, checked: false }];
    e.target.value = ''
  }

  $inspect(tasks);
</script>

<div class="mx-auto max-w-lg w-full boreder rounded-2xl mt-10 flex flex-col gap-4">
  <h1 class="font-medium text-xl">Tasks</h1>
  <input class="px-2 py-1 rounded-xl border w-full border-neutral-300" placeholder="Add task" type="text" onkeydown={addTask}>
  <div class="flex flex-col gap-4">
    {#each tasks as task}
      <div class="flex flex-row gap-2" in:fly={{ easing:backOut, duration: 500, y:'-100%' }}>
        <input type="checkbox" bind:checked={task.checked}>
        <p>{task.value}</p>
      </div>
    {/each}
  </div>
</div>
