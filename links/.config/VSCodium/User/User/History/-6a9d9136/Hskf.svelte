<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';

	// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'error', action: { text : 'Add', remove: false, callback:(e) => {
			console.log(e);
		} } });
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

<!-- You do not to add a class. The "relative" class is just for this demo -->
<Toaster class="relative" />
