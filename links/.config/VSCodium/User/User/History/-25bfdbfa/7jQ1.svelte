<script>
  // import Search from '$lib/components/core/Search.svelte';
  // import Sidebar from '$lib/components/core/Sidebar';

  let { children } = $props();
</script>

<!-- <Search /> -->

<div class="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-row">
  <!-- Sidebar in layout to not reload images and icons when navigating -->
  <!-- <Sidebar open={sidebarOpen} /> -->

  {@render children()}
</div>
