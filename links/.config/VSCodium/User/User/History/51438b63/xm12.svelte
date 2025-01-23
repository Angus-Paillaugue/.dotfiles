<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

  const { children }: SvelteHTMLElements['h1'] = $props();
</script>

<h1>
  {@render children?.()}
</h1>
