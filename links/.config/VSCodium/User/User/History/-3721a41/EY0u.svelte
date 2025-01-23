<script>
  import { cn } from '$lib/utils';

  const {
    definition
  } = $props();
</script>

<div class="mt-8 rounded border border-main dark:border-main-dark">
  <div
    class="w-fit rounded-br-md rounded-tl-md border-2 border-primary-600 bg-primary-400/50 px-2 text-primary-950 dark:border-primary-400 dark:bg-primary-900/50 dark:text-primary-50"
  >
    <h1 class="m-0 border-none text-xl font-bold">{definition.name}</h1>
  </div>
  <p class="mx-4 mb-0 mt-5 leading-7">
    {definition.description}
  </p>
  <table class="w-full table-auto">
    <thead>
      <tr>
        <td>Name</td>
        <td>Description</td>
        <td>Default</td>
        <td>Type</td>
      </tr>
    </thead>
    <tbody>
      {#each definition.params as params}
        <tr
          class={cn(
            'my-5 border-t border-main px-4 pt-5 dark:border-main-dark text-xs font-medium',
          )}
        >
          <td class="border-none">
            <div class="rounded border-neutral-700 bg-neutral-600/20 px-2 py-0.5 text-text-heading dark:text-text-heading-dark w-fit">
              {params.name}
            </div>
          </td>
          <td class="border-none">
            {params.description}
          </td>
          <td class="border-none">
            {params?.default}
          </td>
          <td class="border-none">
            {params.type}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- <div
  class={cn('mt-8 rounded border border-main dark:border-main-dark', className)}
  id="definition-{name}"
  {...restProps}
>
  <div
    class="w-fit rounded-br-md rounded-tl-md border-2 border-primary-600 bg-primary-400/50 px-2 text-primary-950 dark:border-primary-400 dark:bg-primary-900/50 dark:text-primary-50"
  >
    <h1 class="m-0 border-none text-xl font-bold">{name}</h1>
  </div>
  {#if description}
    <p class="mx-4 mb-0 mt-5 leading-7">
      {description}
    </p>
  {/if}

  {@render children()}
</div> -->
