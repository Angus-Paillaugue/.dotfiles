<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { createPagesIndex, searchPagesIndex } from '$lib/search';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';

  let search = $state('loading');
  let searchTerm = $state('');
  let results = $state([]);
  let currentlyFocusedSearchResult = $state(0);

  onMount(async () => {
    window.addEventListener('keydown', (e) => {
      if (event.ctrlKey && event.key === 'k') {
        e.preventDefault();
        $searchModalShown = true;
        setTimeout(() => {
          document.getElementById('search').focus();
        }, 300);
      }else if (e.key === 'Escape') {
        $searchModalShown = false;
      }else if (document.activeElement.tagName === 'INPUT') {
        const focusClasses = ""
        const addFocusClass = (el) => el.classList.add(focusClasses.split(' '));
        const removeFocusClass = (elArr) => elArr.map(el => el.classList.remove(focusClasses.split(' ')));
        // Input is focused
        if (e.key === 'ArrowDown') {
          currentlyFocusedSearchResult = Math.min(currentlyFocusedSearchResult + 1, results.length - 1);
        }else if (e.key === 'ArrowUp') {
          currentlyFocusedSearchResult = Math.max(currentlyFocusedSearchResult - 1, 0);
          resultsContainer.children[currentlyFocusedSearchResult].focus();
        }else if (e.key === 'Enter') {
          resultsContainer.children[currentlyFocusedSearchResult].click();
        }
      }
    });
    createPagesIndex();
    search = 'ready';
  });

  $effect(() => {
    if (search === 'ready') {
      // runs each time `searchTerm` updates
      results = searchPagesIndex(searchTerm);
    }
  });

  afterNavigate(() => {
    if (!$searchModalShown) return;
    document.getElementById('search').value = '';
    searchTerm = '';
    $searchModalShown = false;
  });
</script>

{#if $searchModalShown}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[52] bg-neutral-950/50 backdrop-blur-sm"
    transition:fade={{ duration: 300 }}
    onclick={() => ($searchModalShown = false)}
  ></div>
  <div
    class="bg-neutral-100 z-[52] fixed max-md:top-0 max-md:left-0 max-md:right-0 md:top-1/2 md:left-1/2 md:-translate-y-1/2 md:-translate-x-1/2 dark:bg-neutral-800 md:rounded-t-md w-full max-w-screen-md md:rounded-md dark:text-white overflow-hidden"
    transition:fly={{ y: '12', duration: 300 }}
  >
    <div class="relative w-full">
      <Icon icon="line-md:search" class="size-6 absolute top-1/2 left-3 -translate-y-1/2" />
      <input
        type="text"
        name="search"
        id="search"
        class="w-full px-12 py-4 text-xl bg-neutral-100 dark:bg-neutral-800 focus:outline-none {results.length >
          0 && 'border-b'}"
        placeholder="Search or pages"
        autocomplete="off"
        bind:value={searchTerm}
      />
      <kbd class="hidden md:block absolute top-1/2 right-3 -translate-y-1/2">ESC</kbd>
    </div>
    {#if results.length > 0}
      <div class="grid grid-cols-1 gap-2 p-4 max-h-[50vh] overflow-y-auto no-scrollbar" id="results">
        {#each results as result (result.url)}
          <a
            href={result.url}
            class="list-none w-full p-2 rounded-md border border-neutral-300/50 dark:border-neutral-700/50 flex flex-col gap-2 hover:bg-neutral-300/50 dark:hover:bg-neutral-700/50 transition-colors"
          >
            <h2 class="m-0">
              {@html result.name}
            </h2>
            <p class="m-0">{@html result.description}</p>
          </a>
        {/each}
      </div>
    {/if}
  </div>
{/if}
