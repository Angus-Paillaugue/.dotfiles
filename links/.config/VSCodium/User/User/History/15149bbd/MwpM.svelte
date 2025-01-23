<script lang="ts">
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

  interface MyProps {

  }

  let { checked = $bindable(false), class:className, ...restProps }: (SvelteHTMLElements['input'] & MyProps) = $props()
</script>

<div class="inline-flex items-center">
  <label class="flex items-center cursor-pointer relative">
    <input type="checkbox" class={cn("size-5 cursor-pointer transition-all appearance-none rounded border border-border checked:bg-card", className)} bind:checked {...restProps} />
    <span class="absolute text-foreground opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <Check class="size-3.5" strokeWidth={3} />
    </span>
    {#if checked}
    {/if}
  </label>
</div>
