<script lang="ts">
	import { cn } from "$lib/utils";
	import type { SvelteHTMLElements } from "svelte/elements";
	import { fade } from "svelte/transition";
	import Spinner from "../Spinner";

  type Variant = 'primary' | 'secondary' | 'icon' | 'danger';

  interface MyProps {
    loading?: boolean;
    variant?: Variant;
  }

  type Props = MyProps & (
    { href: string } & SvelteHTMLElements['a'] |
    SvelteHTMLElements['button']
  )

  const { class: className, loading = false, variant = 'secondary', children, ...restProps }: Props = $props();

  const baseClasses = 'rounded transition-colors flex flex-col gap-2 w-fit items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 text-base font-sans font-medium';

  const variantClasses = new Map<Variant, string>([
    ['primary', 'bg-primary text-foreground'],
    ['secondary', 'bg-secondary hover:bg-secondary-light border border-border text-foreground'],
    ['icon', 'hover:bg-secondary/50 text-foreground size-7 p-1'],
    ['danger', 'bg-secondary hover:bg-secondary-light border border-border text-danger'],
  ]);

  const finalClasses = cn(baseClasses, variantClasses.get(variant), className);
</script>

{#snippet loader()}
  {#if loading}
    <span
      in:fade={{ delay: 200, duration: 300 }}
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <Spinner class="size-6" />
    </span>
  {/if}
{/snippet}


<svelte:element
		this={tagName}
    class={finalClasses}
    {...restProps}
    {#if 'href' in restProps}
      href={restProps.href}
    {:else}
      type="button"
    {/if
{#if 'href' in restProps}
  <a class={finalClasses} {...restProps}>
    {@render loader()}
    {@render children?.()}
  </a>
{:else}
  <button class={finalClasses} {...restProps}>
    {@render loader()}
    {@render children?.()}
  </button>
{/if}
