<script>
	import { cn } from '$lib/utils';
	import { Spinner } from '$lib/components';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	const {
		children,
		class: className,
		variant: propVariant = 'primary',
		loading = false,
		...restProps
	} = $props();
	const tagName = 'href' in restProps ? 'a' : 'button';
	const baseClasses =
		'w-full flex flex-row items-center relative justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-lg font-medium transition-all disabled:cursor-not-allowed';
	const variantClasses = new Map([
		['primary', 'bg-neutral-800 text-neutral-100'],
		['secondary', 'rounded-xl bg-neutral-800 w-fit px-3 py-1 text-base hover:bg-neutral-700/80'],
		['square', 'p-2 aspect-square w-fit'],
		['backButton', 'size-8 p-0 rounded-full bg-neutral-700/50'],
		['ghost', 'bg-transparent'],
		['small', 'px-3 py-1 text-base'],
		['none', ''],
		['danger', 'bg-red-600 text-neutral-100'],
		['link', 'p-0 underline text-base font-medium inline w-fit text-neutral-400 hover:text-neutral-100 rounded-none']
	]);

	let variants = $derived(propVariant.split(' '));
	const element = 'href' in restProps ? 'a' : 'div';
</script>

{#if variants.some((v) => !variantClasses.has(v))}
	<p class="text-red-500">
		Invalid variant: {variants.filter((v) => !variantClasses.has(v)).join(', ')}
	</p>
{:else}
	<svelte:element
		this={tagName}
		bind:this={element}
		class={cn(baseClasses, ...variants.map((v) => variantClasses.get(v)), className)}
		{...restProps}
	>
		{#if loading}
			<div class="inset-0 bg-inherit flex flex-row items-center justify-center" in:fade={{ delay: 200, duration: 300 }}>
				<Spinner class="size-6" />
			</div>
		{/if}
		{@render children?.()}
	</svelte:element>
{/if}
