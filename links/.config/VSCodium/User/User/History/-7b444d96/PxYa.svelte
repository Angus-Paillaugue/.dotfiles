<script>
	/**
	 * The Toaster component is used to display a list of toasts. Put it into your root-most layout
	 * @name Toaster
	 * @example
	 * <Toaster />
	 */

	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Toast from './Toast.svelte';
  import { toasts } from './toasts.js';
	import { Counter } from '@repo/components';
	import { cn } from '@repo/utils';

	const { class: className } = $props();

	let count = $state(0);
	$effect(() => {
		count = $toasts.length - 1
	});
</script>

<div class={cn("fixed left-0 right-0 top-4 flex flex-row items-start justify-center", className)}>
	<div class="w-fit relative flex flex-col items-center justify-start">
    <Toast />
		{#if $toasts.length > 1}
			<div
				class={cn("flex h-12 md:h-14 aspect-square px-1 shrink-0 flex-row gap-1 items-center justify-center rounded-full overflow-hidden absolute top-0 left-full ml-4 bg-body-dark dark:bg-neutral-800 text-xl font-bold text-text-heading-dark shadow-lg", count > 99 && 'text-sm')}
				transition:scale={{ duration: 500, start: 0, easing: quintOut }}
			>
				+ <Counter bind:value={count} lineHeight={count > 99 ? 15 : 20} />
			</div>
		{/if}
	</div>
</div>
