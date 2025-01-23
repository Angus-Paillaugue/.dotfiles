<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		children?: () => any;
		class?: string;
	}
	let { children, class: className, variant = 'default', loading, ...restProps }: Props = $props();
	const baseClasses =
		'w-fit rounded-lg

	const buttonVariants = variant instanceof Array ? variant : [variant];

	const variantClasses = buttonVariants.map((variant) => variants.has(variant) ? variants.get(variant) : variants.get('default'));
</script>

<button class={cn(baseClasses, variantClasses, className)} {...restProps}>
	{#if loading}
		<LoaderCircle class="size-4 animate-spin" />
	{/if}
	{@render children?.()}
</button>
