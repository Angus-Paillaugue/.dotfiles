<script>
  const { name, description, definition, notes } = $props();
</script>

<div class="rounded-md border border-neutral-300/50 dark:border-neutral-700/50">
  <div
    class="border-primary-600 bg-primary-400/50 dark:border-primary-400 dark:bg-primary-900/50 text-primary-950 dark:text-primary-50 w-fit p-2 rounded-tl-md rounded-br-md border-2"
  >
    <h1 class="font-bold text-xl m-0">{name}</h1>
  </div>
  {#if description}
    <p class="mx-3 mt-6 mb-0 leading-7">
      {description}
    </p>
  {/if}

  {#if definition.name}
    <h4 class="text-lg font-bold tracking-tight mt-6 px-3">
      {definition.name}
    </h4>
  {/if}
  
  {#if notes?.length > 0}
    <div class="flex flex-col gap-4 mt-6 p-4">
      {#each notes as note}
        <p class="mb-0"><span class="text-base text-primary-600">NOTE :</span> {note}</p>
      {/each}
    </div>
  {/if}
</div>
