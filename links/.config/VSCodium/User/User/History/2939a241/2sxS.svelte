<script>
	import Table from './Table.svelte';
	import { ButtonPrimary, Input, Kbd, Tooltip } from '$lib/components';
	import TrackProductModal from './TrackProductModal.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	let products = $state(data.products || []);
	let addProductModal = $state(false);
	let filteredProducts = $state([]);

	onMount(() => {
		filteredProducts = products;
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				addProductModal = false;
			} else if (
				e.key === 'a' &&
				!addProductModal &&
				!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
			) {
				addProductModal = true;
				e.preventDefault();
			} else if (
				e.key === 's' &&
				!addProductModal &&
				!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
			) {
				document.querySelector('input[name="search"]').focus();
				e.preventDefault();
			}
		});
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TrackProductModal bind:isOpen={addProductModal}>
	<Input name="url" placeholder="Enter product URL" autocomplete="off" class="w-full" />
</TrackProductModal>

<div class="container mx-auto px-4 md:px-6 py-4 md:py-8 h-screen flex flex-col">
	<div class="flex items-center justify-between mb-4 md:mb-6">
		<div class="flex flex-row gap-2 items-center">
			<img src="/logo-512.webp" alt="Zalando price tracking logo" class="h-6">
			<h1 class="text-2xl font-black">Price Tracker</h1>
		</div>
		<ButtonPrimary onclick={() => (addProductModal = true)} class="group">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4 mr-2"
			>
				<path d="M5 12h14"></path>
				<path d="M12 5v14"></path>
			</svg>
			Add Product
			<Tooltip>
				<Kbd>a</Kbd>
			</Tooltip>
		</ButtonPrimary>
	</div>

	<!-- Products table -->
	<Table bind:products />
</div>
