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
</script>

<div class="mt-auto">
  <div
    class="mt-2 grid grid-cols-2 items-end justify-between gap-4 border-t border-main dark:border-main-dark p-2"
  >
    {#if previousPage}
      <a
        href={previousPage.url}
        class="relative h-full cursor-pointer flex flex-col gap-2 rounded p-2 pr-8 transition-all md:p-4 md:pr-8"
      >
        <span class="text-xl font-light">Previous</span>
        <div class="flex flex-row items-center justify-start gap-1">
          <ChevronLeft
            class="size-4 text-muted-foreground"
          />
          <span
            class="text-lg font-semibold text-muted-foreground line-clamp-1"
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
        class="relative h-full cursor-pointer flex flex-col justify-end text-end items-end gap-2 rounded p-2 pr-8 transition-all md:p-4 md:pr-8 hover:bg-accent"
      >
        <span class="text-xl font-light">Next</span>
        <div class="flex flex-row items-center justify-end gap-1">
          <span
            class="text-lg font-semibold text-muted-foreground line-clamp-1"
          >
            {nextPage.name}
          </span>
          <ChevronRight
            class="size-4 text-muted-foreground"
          />
        </div>
      </a>
    {/if}
  </div>
</div>
