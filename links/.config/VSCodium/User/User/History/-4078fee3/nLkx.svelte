<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  type Variant = 'primary' | 'secondary' | 'icon' | 'danger';

  interface MyProps {
    loading?: boolean;
    variant?: Variant;
  }

  type Props = MyProps & (
    { href: string } & SvelteHTMLElements['a'] |
    SvelteHTMLElements['button']
  )

  const { class: className, variant = 'primary', children, ...restProps }: Props = $props();

  const baseClasses = 'rounded transition-colors flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 text-base font-sans font-medium';

  const variantClasses = new Map<Variant, string>([
    ['primary', 'bg-primary text-foreground'],
    ['secondary', 'bg-secondary hover:bg-secondary-light border border-border text-foreground'],
    ['icon', 'bg-card border border-border text-foreground size-8 p-1'],
    ['danger', 'bg-card border border-border text-danger'],
  ]);

  const finalClasses = cn(baseClasses, variantClasses.get(variant), className);
</script>


{#if 'href' in restProps}
  <a class={finalClasses} {...restProps}>
    {@render children?.()}
  </a>
{:else}
  <button class={finalClasses} {...restProps}>
    {@render children?.()}
  </button>
{/if}
