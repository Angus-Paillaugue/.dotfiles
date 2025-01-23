<script>
	import '../app.css';
	import Toaster from '$lib/components/Toast';

	const { children } = $props();
</script>

<Toaster />

{@render children()}
