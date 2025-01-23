<script>
  import { createEventDispatcher } from 'svelte'

  const { children } = $props();
  const dispatch = createEventDispatcher();

  let open = $state(false);

  $effect(() => {
    dispatch('open', open);
  });
</script>

<button onclick={() => {open = !open;}}>
  {@render children()}
</button>
