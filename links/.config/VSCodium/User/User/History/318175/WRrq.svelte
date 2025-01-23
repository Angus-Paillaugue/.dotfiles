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
    <h4 class="text-lg font-bold tracking-tight mt-6 px-3">
      {definition.name}
    </h4>
    <table class="w-full table-auto">
      <thead>
        <tr class="border-b border-neutral-300 dark:border-neutral-800 whitespace-nowrap text-base font-medium">
          {#if definition?.colNames}
            {#each definition.colNames as colName}
              <th class="text-left px-2">{colName}</th>
            {/each}
          {:else}
            <th class="text-left px-2">Name</th>
            <th class="text-left px-2">Default</th>
            <th class="text-left px-2">Type / Description</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each definition.content as prop}
          <tr class="border-b border-neutral-200 dark:border-neutral-900">
            <td class="p-2">
              {#each Object.entries(prop) as [key, value]}
                {#if key === "name"}
                  {#if prop.href}
                    <a href={prop.href} class="font-bold px-1 rounded bg-primary-800/50 border border-primary-600 text-white w-fit text-sm">{prop.name}</a>
                  {:else}
                    <p class="font-bold px-1 rounded bg-primary-800/50 border border-primary-600 text-white w-fit text-sm">{prop.name}</p>
                  {/if}
                {/if}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/each}
</div>
