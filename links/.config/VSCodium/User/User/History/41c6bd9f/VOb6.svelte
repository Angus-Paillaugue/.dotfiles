<script>
  import Search from '$lib/components/core/Search.svelte';

  let { children } = $props();
</script>

<Search />

<div class="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-row">
    <Sidebar open={sidebarOpen} style={sideBar.style} />
{@render children()}
</div>
