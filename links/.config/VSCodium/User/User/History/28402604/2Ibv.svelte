<script>
  import { getContext } from 'svelte';

  const { children } = $props();
  const { toggle } = getContext('dropdown');
</script>

<button onclick={toggle}>
  {@render children()}
</button>
