<script>
  import { getContext } from 'svelte';

  const { children } = $props();
  const { toggle } = getContext('dropdown');
</script>

<button onclick={() => {open = !open;}}>
  {@render children()}
</button>
