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
  let selectedIndex = $state(-1);


  onMount(async () => {
    window.addEventListener('keydown', (e) => {
      if (event.ctrlKey && event.key === 'k') {
        e.preventDefault();
        $searchModalShown = true;
        setTimeout(() => {
          document.getElementById('search').focus();
        }, 300);
      } else if (e.key === 'Escape') {
        $searchModalShown = false;
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
    // $searchModalShown = false;
  });

  /**
   * Add border to the search container when scrolling the results.
   *
   * @param {Event} e - The scroll event object.
   */
  function onResultsScroll(e) {
    const searchContainer = document.getElementById('searchContainer');
    if(e.target.scrollTop > 0) {
      searchContainer.classList.add('border-neutral-300/50', 'dark:border-neutral-700/50');
    } else {
      searchContainer.classList.remove('border-neutral-300/50', 'dark:border-neutral-700/50');
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      selectedIndex = (selectedIndex + 1) % results.length;
      scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      selectedIndex = (selectedIndex - 1 + results.length) % results.length;
      scrollToSelected();
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      // Handle the selection of the current item
      results[selectedIndex].click()
      // Perform the action with the selected result
    }
  }

  function scrollToSelected() {
    const selectedElement = document.getElementById(`result-${selectedIndex}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' });
    }
  }
</script>

{#if $searchModalShown}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 bg-neutral-950/20 backdrop-blur-sm"
    transition:fade={{ duration: 300 }}
    onclick={() => ($searchModalShown = false)}
  ></div>
  <div class="fixed z-50 inset-0 p-4 sm:p-6 md:p-12">
    <div
      class="w-full max-h-full overflow-y-auto max-w-screen-md overflow-hidden bg-neutral-100 dark:bg-neutral-950 dark:text-white rounded-2xl mx-auto border border-neutral-300/50 dark:border-neutral-700/50 no-scrollbar"
      transition:fly={{ y: '12', duration: 300 }}
      onscroll={onResultsScroll}
    >
      <div class="w-full sticky top-0 z-10 bg-neutral-100 dark:bg-neutral-950 p-2 border-b border-transparent transition-all" id="searchContainer">
        <div class="relative">
          <Icon icon="line-md:search" class="absolute left-3 top-1/2 size-6 -translate-y-1/2" />
          <input
            type="text"
            name="search"
            id="search"
            class="w-full bg-transparent px-12 py-4 text-xl focus:outline-none dark:bg-transparent rounded-xl border border-neutral-300/50 dark:border-neutral-700/50 {results.length >
              0 && 'border-b'}"
            placeholder="Search or pages"
            autocomplete="off"
            onkeydown={handleKeyDown}
            bind:value={searchTerm}
          />
          <kbd class="absolute right-3 top-1/2 hidden -translate-y-1/2 md:block">ESC</kbd>
        </div>
      </div>
      {#if results.length > 0}
        <div
          class="p-2"
          id="results"
        >
          {#each results as result, index}
            <a
              href={result.url}
              class="relative rounded-xl list-none transition-colors hover:bg-neutral-300/50 focus:bg-neutral-300/50 dark:focus:bg-neutral-800/50 dark:hover:bg-neutral-800/50 m-0 flex flex-row justify-between items-center p-2 px-4 py-2 group focus:outline-none {index === selectedIndex && "bg-neutral-300/50 dark:bg-neutral-800/50 selected"}"
              id={`result-${index}`}

            >
              <div class="flex w-full list-none justify-center flex-col gap-2 rounded-md">
                <h2 class="m-0">
                  {@html result.name}
                </h2>
                <p class="m-0">{@html result.description}</p>
              </div>
              <Icon icon="material-symbols:arrow-forward-ios-rounded" class="transition-opacity opacity-0 group-hover:opacity-100 group-focus:opacity-100 [.group.selected_&]:opacity-100" />
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if}
