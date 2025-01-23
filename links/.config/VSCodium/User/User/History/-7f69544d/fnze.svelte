<script>
  const { data } = $props();
  const { latestExercises } = data;
</script>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {#each latestExercises as exercise}
              <tr class="odd:bg-white odd:dark:bg-neutral-900 even:bg-neutral-800 border-b border-neutral-700">
                  <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                      Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">
                      Silver
                  </td>
                  <td class="px-6 py-4">
                      Laptop
                  </td>
                  <td class="px-6 py-4">
                      $2999
                  </td>
                  <td class="px-6 py-4">
                      <a href="#" class="font-medium text-blue-500 hover:underline">Edit</a>
                  </td>
              </tr>
              <a href="/app/exercises/{exercise.id}">
                <h2>{exercise.title}</h2>
              </a>
            {/each}
        </tbody>
    </table>
</div>
