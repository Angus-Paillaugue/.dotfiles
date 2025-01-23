<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";

  type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'icon';

  interface MyProps {
    loading?: boolean;
    variant?: Variant;
  }

  type Props = MyProps & (
    { href: string } & SvelteHTMLElements['a'] |
    SvelteHTMLElements['button']
  )

  const { class: className, variant = 'primary', children, ...restProps }: Props = $props();

  const baseClasses = 'rounded hover:bg-border transition-colors bg-card flex flex-col items-center justify-center size-8';

  const variantClasses = new Map<Variant, string>([
    ['primary', 'bg-primary text-on-primary'],
    ['secondary', 'bg-secondary text-on-secondary'],
    ['danger', 'bg-danger text-on-danger'],
    ['success', 'bg-success text-on-success'],
    ['icon', 'bg-transparent text-on-background'],
  ]);

  const finalClasses = cn(baseClasses, variantClasses.get(variant));
</script>


{#if 'href' in restProps}
  <a class={finalClasses} {...restProps}>
    {children}
  </a>
{:else}
  <button class={finalClasses} {...restProps}>
    {children}
  </button>
{/if}
