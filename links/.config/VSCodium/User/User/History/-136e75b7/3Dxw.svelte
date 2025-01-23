<script>
  import { getContext } from 'svelte';
  import { Button } from '$lib/components';
  import { cn } from '$lib/utils';

  const { children, class:className, ...restProps } = $props();
  const { toggle } = getContext('dropdown');
</script>

<Button onclick={toggle} name="Toggle dropdown" class={cn("dropdown-trigger", className)} {...restProps}>
  {@render children()}
</Button>
