<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';

		// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'success', action: { text : 'Add', remove: true, callback: () => {
			console.log('Add');
		} } });
		setTimeout(() => {
			addToast({ type: 'error'});
		}, 1000);
		setTimeout(() => {
			addToast({ type: 'info'});
		}, 2000);
	});
</script>

<Toaster />
