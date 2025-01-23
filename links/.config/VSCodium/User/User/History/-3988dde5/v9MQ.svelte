<script>
	import { Toaster, addToast } from '$lib/components/Toast';
	import { onMount } from 'svelte';
	import { Counter } from '$lib/components/counter/';

	let val = $state(2)

	// Adding toasts on mount
	onMount(() => {
		addToast({ type: 'error', action: { text : 'Add', remove: false, callback: () => {
			console.log('Add');
		} } });
		setTimeout(() => {
			addToast({ type: 'success'});
			val = 1000;
		}, 1000);
		setTimeout(() => {
			addToast({ type: 'warning'});
		}, 2000);
		setTimeout(() => {
			addToast({ type: 'info'});
		}, 3000);
	});
</script>

<Toaster />
<div class="h-40"></div>
<Counter bind:value={val} />
