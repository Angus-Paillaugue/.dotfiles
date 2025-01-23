<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  const { class:className, children, ...restProps }: SvelteHTMLElements['button'] = $props();

  const baseClasses = "block bg-secondary border border-border text-foreground relative";

  const finalClasses = cn(baseClasses, className);

  let isOpen = $state(false);
  let value = $state('');

  function open() {
    isOpen = true;
  }

  function close() {
    isOpen = false;
  }
</script>

<button
  class={finalClasses}
  onclick={open}
  onblur={close}
  {...restProps}
>
  {#if isOpen}
    {@render children?.()}
  {/if}
</button>
