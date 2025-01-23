<script>
  import { getTree } from '$lib/pages';
  import PageList from './PageList.svelte';
  import { afterNavigate } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { searchModalShown } from '$lib/stores';
  import { toggleMode, mode } from 'mode-watcher';
  import { socials, socialsTarget } from '$conf';
  import { scale } from 'svelte/transition';

  const pages = getTree();
  let { open = $bindable(false), style = 'details' } = $props();

  afterNavigate(() => {
    if (open) open = false;
  });
</script>

<aside
  class="h-screen p-2 max-md:pt-0 flex flex-col gap-0 md:w-[300px] max-md:top-[3.8rem] pb-[3.8rem] overflow-y-auto pl-0 z-40 fixed md:sticky max-md:inset-0 bg-white dark:bg-neutral-900 transition-transform top-0 border-r border-neutral-300/50 dark:border-neutral-800 shrink-0 {open
    ? 'max-md:translate-x-0'
    : 'max-md:-translate-x-full'}"
>
  <!-- Navbar right side on desktop is on the sidebar on mobile -->
  <div class="flex flex-row gap-2 items-center justify-end md:hidden sticky top-0 bg-white dark:bg-neutral-900">
    {#each Object.entries(socials) as [name, url]}
      <a href={url} target={socialsTarget} class="h-fit p-1">
        <Icon icon="ri:{name.toLocaleLowerCase()}-line" class="size-6" />
      </a>
    {/each}
    <span class="w-px h-10 bg-neutral-300 dark:bg-neutral-800"></span>
    <button
      onclick={toggleMode}
      class="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
    >
      {#if $mode === 'dark'}
        <div in:scale>
          <Icon icon="material-symbols:light-mode-outline" class="size-6" />
        </div>
      {:else}
        <div in:scale>
          <Icon icon="material-symbols:dark-mode-outline" class="size-6" />
        </div>
      {/if}
    </button>

    <button
      onclick={() => ($searchModalShown = true)}
      class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    >
      <Icon icon="material-symbols:search-rounded" class="size-6" />
    </button>
  </div>


  <PageList {pages} root={true} {style} />
</aside>

<button
  class="h-12 aspect-square flex flex-col items-center justify-center md:hidden fixed z-50 top-[0.5rem] left-[0.5rem]"
  onclick={() => (open = !open)}
>
  <Icon icon="material-symbols:menu-rounded" class="size-6" />
</button>
