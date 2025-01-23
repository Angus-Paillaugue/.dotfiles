<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";
  import { debounce as debounceFunc } from '$lib/utils';

  interface MyProps {
    label?: string;
    id: string;
    debounce?: number;
    onValueChange?: (val: string) => void;
  }

  let { class: className, debounce = 0, value = $bindable(''), onValueChange, children, label, id, ...restProps }: (SvelteHTMLElements['input'] & MyProps) = $props();
  const baseClasses = 'rounded disabled:cursor-not-allowed disabled:bg-secondary-light w-full bg-secondary border border-border focus:outline-none outline-none focus:ring-2 transition-all ring-primary test-foreground px-3 py-1 text-base font-sans font-medium';

  const finalClasses = cn(baseClasses, className);

  let innerValue = $state(value);

  const handleDebounce = (val: string) => {
    value = val;
    if(onValueChange) onValueChange(val);
  }

  $effect(() => {
    innerValue = value;
  })
</script>

{#snippet input()}
  <input class={finalClasses} use:debounceFunc={{ callback: handleDebounce, delay: debounce }} bind:value={innerValue} {id} name={id} {...restProps} />
{/snippet}

{#if label}
  <div class="flex flex-col gap-1">
    <label for={id} class="text-sm font-sans font-medium">{label}</label>
    {@render input()}
  </div>
{:else}
  {@render input()}
{/if}
