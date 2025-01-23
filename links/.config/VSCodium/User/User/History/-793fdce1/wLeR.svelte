<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle } from 'lucide-svelte';

	type Variant = 'default' | 'icon' | 'secondary';

	interface Props {
		children?: () => any;
		variant?: Variant | Variant[];
		class?: string;
		loading?: boolean;
	}
	let { children, class: className, variant = 'default', loading, ...restProps }: Props = $props();
	const baseClasses =
		'w-fit rounded-lg px-4 py-2 flex flex-row items-center gap-4 text-sm font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed';

	const variants = new Map([
		['icon', 'bg-primary text-background aspect-square p-1.5 size-8'],
		['default', 'bg-primary text-background'],
		['secondary', 'bg-secondary text-primary'],
	]);

	const buttonVariants = variant instanceof Array ? variant : [variant];

	const variantClasses = buttonVariants.map((variant) => variants.has(variant) ? variants.get(variant) : variants.get('default'));
</script>

<button class={cn(baseClasses, variantClasses, className)} {...restProps}>
	{#if loading}
		<LoaderCircle class="size-4 animate-spin" />
	{/if}
	{@render children?.()}
</button>
