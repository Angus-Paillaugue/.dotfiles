<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  interface MyProps {

  }

  let { checked = $bindable(false), class:className, ...restProps }: (SvelteHTMLElements['input'] & MyProps) = $props()
</script>

<div class="inline-flex items-center">
  <label class="flex items-center cursor-pointer relative">
    <input type="checkbox" class={cn("peer size-5 cursor-pointer transition-all appearance-none rounded border border-border checked:bg-card", className)} bind:checked {...restProps} />
    <span class="absolute text-foreground opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
    </span>
  </label>
</div>
