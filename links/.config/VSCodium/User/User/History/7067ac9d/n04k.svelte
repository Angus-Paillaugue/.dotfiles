<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  const { children, class: className, ...restProps }: SvelteHTMLElements['div'] = $props();
</script>

<div class={cn("bg-card border border-border rounded-lg p-4", className)} {...restProps}>
  {@render children?.()}
</div>
