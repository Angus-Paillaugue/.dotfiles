<script lang="ts">
	import { cn } from '$lib/utils';
	import type { SvelteHTMLElements } from 'svelte/elements';
	interface Props {
		title: string;
	}

	let { title, class: className, ...restProps }: (SvelteHTMLElements['h3'] & Props) = $props();
</script>

<h3 class={cn("line-clamp-1 w-full text-start text-lg leading-6 font-medium text-foreground", className)} {...restProps}>{title}</h3>
