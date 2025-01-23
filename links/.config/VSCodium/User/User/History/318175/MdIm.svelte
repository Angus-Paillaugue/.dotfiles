<script>

  const { name, description, definitions } = $props();
</script>


<div class="rounded-md border border-neutral-300 dark:border-neutral-800">
  <div class="bg-primary-800/50 text-white w-fit p-2 rounded-tl-md rounded-br-md border-2 border-primary-600">
    <h1 class="font-bold text-xl m-0">{name}</h1>
  </div>
  <p class="mx-3 mt-6 mb-0 leading-7">
    {description}
  </p>

  {#each definitions as definition}
    <h4 class="text-lg font-bold tracking-tight mt-6">
      {definition.name}
    </h4>
    <table class="w-full table-auto">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Default</th>
          <th class="text-left">Type / Description</th>
        </tr>
      </thead>
      <tbody>
        {#each definition.content as prop}
          <tr class="border-b border-neutral-300 dark:border-neutral-800">
            <td class="p-2">
              <p class="font-bold p-1 rounded bg-primary-800/50 border border-primary-600 text-white w-fit text-sm">{prop.name}</p>
            </td>
            <td class="p-2">
              <p class="font-bold p-1 rounded bg-[var(--inline-code-bg)] text-white w-fit text-sm">{prop.default}</p>
            </td>
            <td class="p-2">
              {#if prop.type}
                <p class="font-bold p-1 rounded bg-[var(--inline-code-bg)] text-white w-fit text-sm">{prop.type}</p>
              {/if}
              {#if prop.description}
                <p>{prop.description}</p>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
</div>
