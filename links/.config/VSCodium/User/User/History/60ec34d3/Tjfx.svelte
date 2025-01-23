<script lang="ts">
  import type { Page } from '$lib/pages';
  import { getTree } from '$lib/pages';
  import { flattenPages } from '$lib/utils';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  const { page }: { page: Page} = $props();
  const pages = flattenPages(getTree());
  let { previousPage, nextPage } = $state(getNavigation());

  /**
   *
   * @function getNavigation
   * @description Retrieves the navigation data.
   * @returns {Object} The navigation data.
   */
  function getNavigation() {
    const index = pages.findIndex((p) => p.url == page.url);

    const previousPage = pages[index - 1];
    const nextPage = pages[index + 1];
    return { previousPage, nextPage };
  }

  $effect(() => {
    const nav = getNavigation();
    previousPage = nav.previousPage;
    nextPage = nav.nextPage;
  });

  $inspect(previousPage)
</script>

<div class="mt-auto">
  <div
    class="mt-2 grid grid-cols-2 items-end justify-between gap-4 border-t border-main dark:border-main-dark"
  >
    {#if previousPage}
      <a
        href={previousPage.url}
        class="relative flex h-full cursor-pointer flex-row items-end justify-start gap-2 rounded p-2 pl-8 transition-all md:p-4 md:pl-8"
      >
        <ChevronLeft
          class="absolute bottom-3 left-2 size-4 text-neutral-500 dark:text-neutral-600 md:bottom-5"
        />
        <div class="flex flex-col justify-end text-start">
          <span class="text-xl font-light">Previous</span>
          <span
            class="text-lg font-semibold text-muted-foreground"
          >
            {previousPage.name}
          </span>
        </div>
      </a>
    {:else}
      <div></div>
    {/if}
    {#if nextPage}
      <a
        href={nextPage.url}
        class="relative flex h-full cursor-pointer flex-row items-end justify-end gap-2 rounded p-2 pr-8 transition-all md:p-4 md:pr-8"
      >
        <div class="flex flex-col justify-end text-end">
          <span class="text-xl font-light">Next</span>
          <span
            class="text-lg font-semibold text-muted-foreground"
          >
            {nextPage.name}
          </span>
        </div>
        <ChevronRight
          class="absolute bottom-3 right-2 size-4 text-neutral-500 dark:text-neutral-600 md:bottom-5"
        />
      </a>
    {/if}
  </div>
</div>
