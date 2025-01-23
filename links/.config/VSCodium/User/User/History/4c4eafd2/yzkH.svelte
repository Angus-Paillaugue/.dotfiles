<script>
  /** @type {import('./$types').LayoutData} */
  const { children } = $props();
</script>

<div class="flex flex-col grow">
  {@render children?.()}
</div>
