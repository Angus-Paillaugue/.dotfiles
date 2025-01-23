<script>
	import '../app.css';
	import Sidebar from '$lib/components/core/Sidebar.svelte';
	import Toasts from '$lib/components/core/Toasts.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { newToast } from '$lib/stores';

	$effect(() => {
		$mode === 'dark'
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});


	newToast({
		type: 'red',
		message: 'Welcome to your new SvelteKit app!',
		duration: 5000
	});
</script>

<Toasts />
<ModeWatcher defaultMode={'dark'} />

<div class="flex flex-col lg:flex-row">
	<Sidebar />

	<slot />
</div>
