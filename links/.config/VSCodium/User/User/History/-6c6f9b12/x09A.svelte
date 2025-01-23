<script>
  // Import code stylesheet
  import '../../../code.css';
  import Sidebar from '$lib/components/core/Sidebar.svelte';

  const { children, data, sidebarOpen = $bindable(false) } = $props();
</script>

<div class="flex flex-row">
  <Sidebar open={sidebarOpen} />

  {@render children()}
</div>
