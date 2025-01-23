<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  const { class: className, children, ...restProps }: SvelteHTMLElements['input'] = $props();

  const baseClasses = 'rounded transition-colors flex flex-col w-fit items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 text-base font-sans font-medium';

  const finalClasses = cn(baseClasses, className);
</script>

<input class={finalClasses} {...restProps} />
