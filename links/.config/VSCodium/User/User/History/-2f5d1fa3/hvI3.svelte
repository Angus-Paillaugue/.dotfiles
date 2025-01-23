<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";


  const { class:className, ...restProps }: SvelteHTMLElements['select'] = $props();

  const baseClasses = "block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const finalClasses = cn(baseClasses, className);
</script>

<select class={finalClasses} {...restProps}>
  
</select>
