<script>
  import { cn } from '$lib/utils';

  const { children, class:className, ...restProps } = $props();
</script>

<div class={cn('rounded-xl border border-neutral-700/50 bg-neutral-800/50 text-neutral-100', className)} {...restProps}>
  {@render children()}
</div>
