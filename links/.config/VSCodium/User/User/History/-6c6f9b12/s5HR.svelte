<script>
  // Import code stylesheet
  import '../../../code.css';
  import Sidebar from '$lib/components/core/Sidebar.svelte';

  let { children, sidebarOpen = $bindable(false) } = $props();
</script>

<div class="flex flex-row">
  <Sidebar bind:open={sidebarOpen} />

  {@render children()}
</div>
