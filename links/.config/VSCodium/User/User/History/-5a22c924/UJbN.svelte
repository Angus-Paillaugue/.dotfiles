<script>
	import '../app.css';
	import Sidebar from '$lib/components/core/Sidebar.svelte';
	import Toasts from '$lib/components/core/Toasts.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
</script>

<Toasts />

<div class="flex flex-col lg:flex-row">
	<Sidebar />

	<slot />
</div>
