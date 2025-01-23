<script>
import { getContext } from 'svelte';

  const { toggle } = getContext('dropdown');
</script>

<button onclick={toggle}>
  {@render children()}
</button>
