<script>
	import { removeToast } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toasts } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { CircleCheckBig, CircleX, TriangleAlert } from "lucide-svelte"

	const baseToastClasses = 'rounded-xl border bg-neutral-900 border-neutral-700 p-4 relative';

	const svgColors = {
		red: 'text-red-600',
		green: 'text-green-600',
		gray: 'text-neutral-600'
	};
</script>

<div
	class="fixed top-16 left-1/2 -translate-x-1/2 z-[51] flex w-full max-w-[500px] flex-col-reverse gap-2"
>
	{#each $toasts.slice(0, 4) as toast (toast.id)}
		<div
			role="alert"
			class={baseToastClasses}
			animate:flip={{ duration: 500 }}
			transition:scale={{ duration: 300 }}
		>
			<div class="flex items-center gap-2">
				{#if toast.type === 'red'}
					<CircleX class={cn('h-5 w-5', svgColors[toast.type])}/>
				{:else if toast.type === 'green'}
					<CircleCheckBig class={cn('h-5 w-5', svgColors[toast.type])}/>
				{:else}
					<TriangleAlert class={cn('h-5 w-5', svgColors[toast.type])}/>
				{/if}

				<strong class="block font-medium">{toast.title}</strong>
			</div>

			<p class="mb-0 mt-2 text-sm">
				{@html toast.message}
			</p>
			<button
				class="absolute right-2 top-2"
				name="Remove toast"
				aria-label="Remove toast"
				on:click={() => removeToast(toast.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-5"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
				>
			</button>
		</div>
	{/each}
</div>
