<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';

		// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'success', action: { text : 'Close', callback: () => {
			console.log('Toast closed');
		} } });
		setTimeout(() => {
			addToast();
		}, 1000);
		setTimeout(() => {
			addToast();
		}, 2000);
	});
</script>

<Toaster />
