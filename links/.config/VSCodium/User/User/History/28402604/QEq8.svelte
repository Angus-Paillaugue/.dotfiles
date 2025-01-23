<script>
  import { createEventDispatcher } from 'svelte'

  const { children } = $props();

  let open = $state(false);

  const dispatch = createEventDispatcher();
</script>

<button onclick={() => {open = !open}}>
  {@render children()}
</button>
