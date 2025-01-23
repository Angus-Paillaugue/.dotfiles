<script>
  import { cn } from '$lib/utils';

  const {
    definition
  } = $props();
  $inspect(definition)
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
  <table>

    {#each definition.params as params}
      <tr
        class={cn(
          'my-5 border-t border-main px-4 pt-5 dark:border-main-dark',
        )}
      >
        <div class="flex flex-wrap items-center gap-2">
          <div class="flex items-center space-x-2 text-xs font-medium">
            <div
              class="rounded border-neutral-700 bg-neutral-600/20 px-2 py-0.5 text-text-heading dark:text-text-heading-dark"
            >
              {params.name}
            </div>
            <span>
              {params.type}
            </span>
            <span>
              {params.description}
            </span>
          </div>
        </div>
      </tr>
    {/each}
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
