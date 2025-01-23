<script>
	import '../app.css';
	import Toaster from '$lib/components/Toast/Toaster.svelte';
	let { children } = $props();
</script>

<Toaster />

<div class="min-h-screen flex flex-col">
	{@render children()}
</div>
