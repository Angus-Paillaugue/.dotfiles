<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  const { class: className, children, ...restProps }: SvelteHTMLElements['input'] = $props();

  const baseClasses = 'rounded disabled:cursor-not-allowed disabled:bg-secondary-light w-full bg-secondary border border-border focus:outline-none test-foreground px-3 py-1 text-base font-sans font-medium';

  const finalClasses = cn(baseClasses, className);
</script>

<input class={finalClasses} {...restProps} />
