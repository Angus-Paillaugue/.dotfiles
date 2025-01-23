<script>
  import { getContext } from 'svelte';

  const { children } = $props();
  const { toggle } = getContext('dropdown');
</script>

<div tabindex="0" onclick={toggle} onkeydown={(e) => {if(e.key === "Enter") toggle()}} role="button">
  {@render children()}
</div>
