<script>
	import { Modal, Input, ButtonPrimary, Spinner, Alert } from '$lib/components';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let { isOpen = $bindable(), products = $bindable() } = $props();

	let isAddingProduct = $state(false);
	let error = $state();

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
