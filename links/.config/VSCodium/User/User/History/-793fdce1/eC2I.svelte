<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		children?: () => any;
		variant?: 'default' | 'icon';
		class?: string;
		loading?: boolean;
	}
	let { children, class: className, variant = 'default', loading, ...restProps }: Props = $props();
	const baseClasses =
		'w-fit rounded-lg px-4 py-2 flex flex-row items-center gap-4 text-sm font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed';

	const variants = new Map([
		['icon', 'bg-primary text-background aspect-square p-1.5 size-8'],
		['default', 'bg-primary text-background']
	]);

	const variantClasses = variants.has(variant) ? variants.get(variant) : variants.get('default');
</script>

<button class={cn(baseClasses, variantClasses, className)} {...restProps}>
	{#if loading}
		<LoaderCircle class="size-4 animate-spin" />
	{/if}
	{@render children?.()}
</button>
