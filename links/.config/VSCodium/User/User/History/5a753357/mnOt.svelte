<script lang="ts">
	import { cn } from '$lib/utils';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		children?: () => any;
		class?: string;
	}
	let { children, class: className, ...restProps }: Props = $props();
	const baseClasses =
		'w-fit inline-block hover:underline focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50';

</script>

<button class={cn(baseClasses, className)} {...restProps}>
	{@render children?.()}
</button>
