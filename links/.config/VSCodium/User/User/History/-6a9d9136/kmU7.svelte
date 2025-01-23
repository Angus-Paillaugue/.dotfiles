<script>
	import { Toaster, addToast, removeToast } from '$lib/components';
	import { onMount } from 'svelte';

	// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'error', timeout: false, action: { text : 'Action button', remove: false, callback:(e) => {
			e.message = "Action clicked !!!"
			setTimeout(() => {
				removeToast(e.id);
			}, 1000)
		} } });
		setTimeout(() => {
			addToast({ timeout: false,type: 'success'});
		}, 1000);
		setTimeout(() => {
			addToast({ timeout: false,type: 'warning'});
		}, 2000);
		setTimeout(() => {
			addToast({ timeout: false,type: 'info'});
		}, 3000);
	});
</script>

<!-- You do not to add a class. The "relative" class is just for this demo -->
<Toaster class="relative" style="ios" />
