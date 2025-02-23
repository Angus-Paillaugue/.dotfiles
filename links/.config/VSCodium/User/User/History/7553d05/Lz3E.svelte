<script lang="ts">
  import { onMount } from 'svelte';
  import { scale, fade } from 'svelte/transition';
  import { createPagesIndex, searchPagesIndex } from '$lib/search';
  import type { Page } from '$lib/pages';
  import { afterNavigate } from '$app/navigation';
  import { cn } from '$lib/utils';
  import { Search, ChevronRight } from 'lucide-svelte';
  import Input from '$lib/components/ui/input/input.svelte';

  let { open = $bindable(false) } = $props();

  let search: 'loading' | 'ready' = $state('loading');
  let searchTerm: string = $state('');
  let results: Page[] = $state([]);
  let selectedIndex: number = $state(0);
  let open: boolean = $state(false);

  onMount(() => {
    window.addEventListener('keydown', onWindowKeyDown);
    (async () => {
      await createPagesIndex();
      search = 'ready';
    })();

    return () => {
      window.removeEventListener('keydown', onWindowKeyDown);
    };
  });

  afterNavigate(() => {
    if (!open) return;
    searchTerm = '';
    open = false;
  });

  $effect(() => {
    if (search === 'ready') {
      // runs each time `searchTerm` updates
      results = searchPagesIndex(searchTerm);
    }
  });

  $effect(() => {
    if (open) {
      setTimeout(() => {
        document.getElementById('search')?.focus();
      }, 300);
    }
  });

  /**
   * Function to handle keydown events on the window.
   */
  function onWindowKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      open = true;
    } else if (e.key === 'Escape') {
      open = false;
    }
  }

  /**
   * Add border to the search container when scrolling the results.
   */
  function onResultsScroll(e: Event) {
    const searchContainer = document.getElementById('searchContainer');
    if (!searchContainer) return;
    if ((e.target as HTMLElement).scrollTop > 0) {
      searchContainer.classList.remove('border-transparent');
      searchContainer.classList.add(
        ...'border-border'.split(' ')
      );
    } else {
      searchContainer.classList.add('border-transparent');
      searchContainer.classList.remove(
        ...'border-border'.split(' ')
      );
    }
  }

  /**
   * Handles key down events of the input.
   */
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % results.length;
      scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      selectedIndex = (selectedIndex - 1 + results.length) % results.length;
      scrollToSelected();
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      document.getElementById(`result-${selectedIndex}`)?.click();
    }
  }

  /**
   * Function to scroll to the selected search result.
   */
  function scrollToSelected() {
    const selectedElement = document.getElementById(`result-${selectedIndex}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-black/80"
    transition:fade={{ duration: 200 }}
    onclick={() => (open = false)}
  ></div>
  <div class="fixed inset-0 z-50 p-4 sm:p-6 md:p-12">
    <div
      class="no-scrollbar mx-auto max-h-[300px] w-full max-w-screen-md overflow-hidden overflow-y-auto rounded-2xl bg-background"
      transition:scale={{ start: 0.8, duration: 200 }}
      onscroll={onResultsScroll}
    >
      <div
        class="sticky top-0 z-10 w-full border-b border-transparent bg-sidebar p-2 transition-all"
        id="searchContainer"
      >
        <div class="relative">
          <Search
            class="absolute left-3 top-1/2 size-4 -translate-y-1/2 md:size-6"
          />
          <Input
            class="md:pl-12 w-full py-4 pl-10 text-xl rounded-xl h-fit"
            placeholder="Search for pages"
            aria-label="Search for pages"
            autocomplete="off"
            id="search"
            onkeydown={handleKeyDown}
            onblur={() => (selectedIndex = 0)}
            bind:value={searchTerm}
          />
        </div>
      </div>
      {#if results.length > 0}
        <div class="p-2" id="results">
          {#each results as result, index}
            <a
              href={result.url}
              class={cn(
                'group relative m-0 flex list-none flex-row items-center justify-between rounded-xl p-2 px-4 py-2 transition-colors focus:outline-none',
                index === selectedIndex &&
                  'selected bg-accent'
              )}
              id="result-{index}"
            >
              <div
                class="flex grow list-none flex-col justify-center gap-2 rounded"
              >
                {#if result.name}
                  <h2 class="m-0 line-clamp-1 truncate text-base font-mono font-normal">
                    {@html result.name}
                  </h2>
                {/if}
                {#if result.description != ''}
                  <p class="m-0 line-clamp-1 truncate text-sm">
                    {@html result.description}
                  </p>
                {/if}
                {#if result.component}
                  <p class="m-0 line-clamp-3 truncate text-xs text-muted-foreground">
                    {@html result.component}
                  </p>
                {/if}
              </div>
              <ChevronRight
                class="size-6 text-muted-foreground shrink-0 opacity-0 transition-opacity group-focus:opacity-100 [.group.selected_&]:opacity-100"
              />
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
