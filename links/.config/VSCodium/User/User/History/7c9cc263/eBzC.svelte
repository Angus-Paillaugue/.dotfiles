<script>
	import { toasts, toast } from './index.js';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { cn } from '$lib/utils';
	import { CircleCheckBig, CircleX, TriangleAlert, X } from 'lucide-svelte';
	import { tweened } from 'svelte/motion';

	const baseToastClasses = 'border border-neutral-700/50 bg-neutral-800 text-neutral-100 relative p-4 rounded-xl';
	const progress = tweened(0, { duration: 5000 });

	const svgColors = {
		red: 'text-red-600',
		green: 'text-green-600',
		gray: 'text-neutral-600'
	};

	toast.success({ message: 'Success toast' });
	toast.error({ message: 'Error toast' });
	toast.info({ message: 'Info toast' });
</script>

<div
	class="fixed left-1/2 top-16 z-[51] flex w-full max-w-[300px] -translate-x-1/2 flex-col-reverse gap-2"
>
	{#each $toasts.slice(0, 4) as t (t.id)}
		<div
			role="alert"
			class={baseToastClasses}
			animate:flip={{ duration: 500 }}
			transition:scale={{ duration: 300 }}
		>
			<div class="flex items-center gap-2">
				{#if t.type === 'red'}
					<CircleX class={cn('h-5 w-5', svgColors[t.type])} />
				{:else if t.type === 'green'}
					<CircleCheckBig class={cn('h-5 w-5', svgColors[t.type])} />
				{:else}
					<TriangleAlert class={cn('h-5 w-5', svgColors[t.type])} />
				{/if}

				<strong class="block text-lg font-bold">{t.title}</strong>
			</div>

			<p class="mb-0 mt-2 text-sm font-medium">
				{@html t.message}
			</p>
			<button
				class="absolute right-2 top-2"
				name="Remove toast"
				aria-label="Remove toast"
				onclick={() => toast.removeToast(t.id)}
			>
				<X class="size-4" />
			</button>
		</div>
	{/each}
</div>
