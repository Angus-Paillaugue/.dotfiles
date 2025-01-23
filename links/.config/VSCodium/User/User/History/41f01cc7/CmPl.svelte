<script lang="ts">
	import { cn, debounce as debounceFunction } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  interface MyPros {
    label?: string;
    id: string;
    debounce?: number;
  }

  let { class: className, debounce = 0, value = $bindable(''), children, label, id, ...restProps }: (SvelteHTMLElements['input'] & MyPros) = $props();

  const baseClasses = 'rounded disabled:cursor-not-allowed disabled:bg-secondary-light w-full bg-secondary border border-border focus:outline-none outline-none focus:ring-2 transition-all ring-primary test-foreground px-3 py-1 text-base font-sans font-medium';

  const finalClasses = cn(baseClasses, className);

  let innerValue = $state(value);

  $effect(() => {
    debounceFunction(() => {
      value = innerValue;
    }, debounce);
  })
</script>

{#snippet input()}
  <input class={finalClasses} bind:value {id} name={id} {...restProps} />
{/snippet}

{#if label}
  <div class="flex flex-col gap-1">
    <label for={id} class="text-sm font-sans font-medium">{label}</label>
    {@render input()}
  </div>
{:else}
  {@render input()}
{/if}
