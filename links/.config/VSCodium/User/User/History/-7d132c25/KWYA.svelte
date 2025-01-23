<script>
	import '../app.css';
	import Toaster from '$lib/components/Toast/Toaster.svelte';
	let { children } = $props();
</script>

<Toaster />

{@render children()}
