<script>
	import { backOut } from "svelte/easing";
	import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Button from  "$lib/components/Button.svelte";

  let tasks = $state([]);

  function addTask(e) {
    if(e.key !== "Enter" || e.target.value.length === 0 || e.target.value) return;
    tasks = [...tasks, { value: e.target.value, checked: false, id: Math.random() }];
    e.target.value = ''
  }
</script>

<Button class="text-white">
  Test
</Button>

<div class="mx-auto max-w-lg w-full boreder rounded-2xl mt-10 flex flex-col gap-4">
  <h1 class="font-medium text-xl">Tasks</h1>
  <input class="px-2 py-1 rounded-xl border w-full border-neutral-300" placeholder="Add task" type="text" onkeydown={addTask}>
  <div class="flex flex-col gap-4">
    {#each tasks as task, i (task.id)}
      <div class="flex flex-row gap-2 items-center" animate:flip={{ duration: 500 }} transition:fly={{ easing:backOut, duration: 500, y:'-100%' }}>
        <input type="checkbox" bind:checked={task.checked}>
        <p>{task.value}</p>
        <button onclick={() => {tasks.splice(i, 1)}} aria-label="Remove task" class="p-2 rounded-xl bg-red-600 text-white ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    {/each}
  </div>
</div>
