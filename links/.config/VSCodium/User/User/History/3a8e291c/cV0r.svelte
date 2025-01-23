<script>
	import { BASE_API_PORT } from '$lib/constants';
	import { Modal, Input, ButtonPrimary, Spinner, Alert } from '$lib/components';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { isOpen = $bindable(), products = $bindable() } = $props();

	const pageURL = $page.url;
	let isAddingProduct = $state(false);
	let error = $state();

	async function trackNewProduct(e) {
		e.preventDefault();
		isAddingProduct = true;
		const url = e.target.url.value;
		try {
			const returnedResponse = await fetch(pageURL.protocol+"//"+pageURL.hostname+":"+BASE_API_PORT + '/product/track', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ productUrl: url })
			});
			const returnedData = await returnedResponse.json();
			if (returnedData.success) {
				products.unshift(returnedData.data);
				e.target.url.value = '';
				isOpen = false;
			} else {
				console.error(returnedData.message);
				error = returnedData.message;
			}
		} catch (error) {
			console.error(error);
		}
		isAddingProduct = false;
	}

	$effect(() => {
		if (isOpen) {
			error = null;
			document.querySelector('input[name="url"]').focus();
		}
	});
</script>

<Modal bind:isOpen title="Track new product">
	<form class="flex flex-col md:flex-row gap-4"
		use:enhance={() => {
			isAddingProduct = true;
			return async ({ update }) => {
				isAddingProduct = false;
				update();
			};
		}}
	>
		<Input name="url" placeholder="Enter product URL" autocomplete="off" class="text-xs" />
		<ButtonPrimary type="submit">
			{#if isAddingProduct}
				<Spinner />
			{:else}
				Add product
			{/if}
		</ButtonPrimary>
	</form>
	{#if error}
		<Alert type="error">
			{error}
		</Alert>
	{/if}
</Modal>
