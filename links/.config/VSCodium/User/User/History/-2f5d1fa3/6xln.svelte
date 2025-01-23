<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  const { class:className, children, ...restProps }: SvelteHTMLElements['select'] = $props();

  const baseClasses = "block bg-secondary border border-border text-foreground";

  const finalClasses = cn(baseClasses, className);
</script>

<select class={finalClasses} {...restProps}>
  {@render children?.()}
</select>
