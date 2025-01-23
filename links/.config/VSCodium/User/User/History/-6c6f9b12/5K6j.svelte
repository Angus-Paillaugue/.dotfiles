<script>
  import Search from '$lib/components/core/Search.svelte';

  let { children, sidebarOpen = $bindable(false) } = $props();
</script>

<Search />

{@render children()}
