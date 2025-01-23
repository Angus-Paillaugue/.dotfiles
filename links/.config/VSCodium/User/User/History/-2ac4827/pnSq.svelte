<script>
	import { CARDS_COLORS } from '$lib/constants';
	import { fade, fly } from 'svelte/transition';

	const { open = $bindable(false), children, color = CARDS_COLORS[0] } = $props();
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

{#if open}
	<!-- Backdrop -->
	<div
		class="backdrop-blur-md fixed inset-0 z-20"
		transition:fade={{ duration: 500 }}
	></div>

	<!-- Article card -->
	<div
		class="fixed inset-0 flex flex-col items-center justify-center max-h-screen md:p-4 z-20"
		transition:fly={{ y: '100%', duration: 500 }}
	>
		<div
			class="flex flex-col items-start justify-start relative w-full max-w-screen-md md:rounded-3xl p-6"
			style="background-color: #{color};"
		>
			{@render children()}
		</div>
	</div>
{/if}
