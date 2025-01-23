<script>
  import { cn } from '$lib/utils';

  const { children, class:className, ...restProps } = $props();
  const tagName = 'href' in restProps ? 'a' : 'div';
</script>

<svelte:element this={tagName} class={cn('rounded-xl border space-y-4 border-neutral-700/50 bg-neutral-800/50 text-neutral-100 p-4 lg:p-6', className)} {...restProps}>
  {@render children()}
</svelte:element>
