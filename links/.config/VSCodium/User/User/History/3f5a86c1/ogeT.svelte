<script>
  import Navbar from './navbar.svelte';
  import Sidebar from './sidebar.svelte';
  import Search from './Search.svelte';
  import Toc from './TOC.svelte';
  import { pageMetadata } from '$lib/stores';

  let { data } = $props();
  let sideBarOpen = $state(false);

  $effect(() => {
    pageMetadata.set({
      title: data?.name,
      description: data?.description,
    });
  })
</script>

<Search />


<div class="mx-auto flex h-svh w-full max-w-screen-2xl flex-row bg-background">
  <Sidebar bind:open={sideBarOpen} />
  <div class="flex flex-col w-full h-full">
    <Navbar page={data} bind:sideBarOpen />
    <div class="flex flex-col-reverse lg:flex-row grow h-[calc(100svh-4rem)]">
      <main
        class="flex grow p-2 overflow-y-auto flex-col no-scrollbar"
      >
        {#if data?.component}
          <svelte:component this={data.component} />
        {/if}
      </main>

      <Toc page={data} />
    </div>
  </div>
</div>
<style>
  :global(body) {
    @apply !bg-sidebar;
  }
</style>
