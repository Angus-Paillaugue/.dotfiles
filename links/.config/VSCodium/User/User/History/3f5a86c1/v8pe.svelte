<script>
  import Navbar from './navbar.svelte';
  import Sidebar from './sidebar.svelte';
    import Toc from './TOC.svelte';

  let { data } = $props();
  let sideBarOpen = $state(false);
</script>

<svelte:head>
  <title>{data?.name ?? 'Docs'}</title>
  <meta property="og:title" content={data?.name ?? 'Docs'} />
  <meta property="twitter:title" content={data?.name ?? 'Docs'} />

  <meta name="description" content={data?.description} />
  <meta
    property="og:description"
    content={data?.description}
  />
  <meta
    property="twitter:description"
    content={data?.description}
  />
  <style>
    body {
      @apply !bg-sidebar;
    }
  </style>
</svelte:head>

<div class="mx-auto flex h-svh w-full max-w-screen-2xl flex-row bg-background">
  <Sidebar bind:open={sideBarOpen}>
    <div class="flex flex-col w-full">
      <Navbar page={data} bind:sideBarOpen />
      <div class="flex flex-row">
        <main
          class="flex h-full grow p-4 overflow-y-auto flex-col no-scrollbar"
        >
          {#if data?.component}
            <svelte:component this={data.component} />
          {/if}
        </main>

        <Toc page={data} />
      </div>
    </div>
  </Sidebar>
</div>
