<script>
  const { children } = $props();

  let open = $state(false)
</script>

<button onclick={() => {open = !open}}>
  {@render children()}
</button>
