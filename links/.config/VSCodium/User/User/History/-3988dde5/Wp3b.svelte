<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';

		// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'success', timeout: 2000, action: { text : 'Add', remove: true, callback: () => {
			console.log('Add');
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
