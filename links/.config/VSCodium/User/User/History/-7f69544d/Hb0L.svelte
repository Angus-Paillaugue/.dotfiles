<script>
  import { Editor, Button, Spinner, Difficulty } from '$lib/components';
  const { data } = $props();
  const { latestExercises } = data;
  console.log(latestExercises);

</script>


<div class="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left rtl:text-right text-neutral-400">
    <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Status
        </th>
        <th scope="col" class="px-6 py-3">
          Title
        </th>
        <th scope="col" class="px-6 py-3">
          Difficulty
        </th>
      </tr>
    </thead>
    <tbody>
      {#each latestExercises as exercise}
        <tr class="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-800 border-b border-neutral-700">
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
            {#if exercise?.completed_at}
              <span class="px-2 py-1 rounded-full text-sm w-fit font-semibold bg-green-500">
                Completed
              </span>
            {/if}
          </th>
          <td class="px-6 py-4">
            Silver
          </td>
          <td class="px-6 py-4">
            Laptop
          </td>
          <td class="px-6 py-4">
            <Difficulty difficulty={exercise.difficulty} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
