<script>
	import Toaster from '$lib/components/Toast';
	import { onMount } from 'svelte';

		// Adding toasts on mount
	onMount(() => {
		addToast();
		setTimeout(() => {
			addToast();
		}, 1000);
		setTimeout(() => {
			addToast();
		}, 2000);
	});
</script>

<Toaster />
