<script>
  /** @type {import('./$types').LayoutData} */
  cont { children } = $props();
</script>

<div class="grow max-w-scree lg mx-auto flex flex-col">
  <main class="flex flex-col grow">
    {@render children?.()}
  </main>
  <nav class="shrink-0"></nav>
</div>
