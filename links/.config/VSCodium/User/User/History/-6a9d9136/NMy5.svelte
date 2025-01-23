<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';

	// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'error', action: { text : 'Add', remove: false, callback:"test" } });
		setTimeout(() => {
			addToast({ type: 'success'});
		}, 1000);
		setTimeout(() => {
			addToast({ type: 'warning'});
		}, 2000);
		setTimeout(() => {
			addToast({ type: 'info'});
		}, 3000);
	});
</script>

<Toaster class="relative" />
