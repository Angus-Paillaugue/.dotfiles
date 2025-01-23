<script>
  import { getContext } from 'svelte';

  const { children } = $props();
  const { toggle } = getContext('dropdown');
</script>

<div tabindex="0" onclick={toggle} role="button">
  {@render children()}
</div>
