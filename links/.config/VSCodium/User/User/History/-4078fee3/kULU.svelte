<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  type Variant = 'primary' | 'secondary' | 'icon';

  interface MyProps {
    loading?: boolean;
    variant?: Variant;
  }

  type Props = MyProps & (
    { href: string } & SvelteHTMLElements['a'] |
    SvelteHTMLElements['button']
  )

  const { class: className, variant = 'primary', children, ...restProps }: Props = $props();

  const baseClasses = 'rounded transition-colors flex flex-col items-center justify-center';

  const variantClasses = new Map<Variant, string>([
    ['primary', 'bg-primary text-foreground'],
    ['secondary', 'bg-card text-foreground'],
    ['icon', 'bg-transparent text-foreground size-10'],
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
