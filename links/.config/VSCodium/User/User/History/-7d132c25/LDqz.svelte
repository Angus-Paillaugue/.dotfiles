<script>
	import '../app.css';
	import { Toaster } from '$lib/components';
	let { children } = $props();
</script>

<Toaster />

<div class="min-h-screen flex flex-col">
	{@render children()}
</div>
