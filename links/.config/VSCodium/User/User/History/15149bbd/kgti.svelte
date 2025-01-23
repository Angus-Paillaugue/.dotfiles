<script lang="ts">
	import { cn } from "$lib/utils";
	import { Check } from "lucide-svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import { scale } from "svelte/transition";

  interface MyProps {
    id: string;
  }

  let { checked = $bindable(), class:className, id, ...restProps }: (SvelteHTMLElements['input'] & MyProps) = $props();
</script>

<div class="inline-flex items-center">
  <label class="flex items-center cursor-pointer relative" for={id}>
    <input {id} type="checkbox" class={cn("size-5 cursor-pointer transition-all appearance-none rounded border border-border checked:bg-card", className)} bind:checked={checked} {...restProps} />
    {#if checked}
      <span class="absolute text-foreground top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" transition:scale={{ duration: 150 }}>
        <Check class="size-3.5" strokeWidth={3} />
      </span>
    {/if}
  </label>
</div>
