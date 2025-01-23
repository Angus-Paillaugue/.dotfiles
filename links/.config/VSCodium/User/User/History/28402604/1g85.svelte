<script>
  import { getContext } from 'svelte';
  import { Button } from '$lib/components';

  const { children, ...restProps } = $props();
  const { toggle } = getContext('dropdown');
</script>

<Button onclick={toggle} role="button" {...restProps}>
  {@render children()}
</Button>
