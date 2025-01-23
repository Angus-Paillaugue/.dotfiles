<script>
  /** @type {import('./$types').LayoutData} */
  const { children } = $props();
</script>

<div class="grow max-w-screen-lg mx-auto flex flex-col">
  <main class="flex flex-col grow">
    {@render children?.()}
  </main>
  <nav class="shrink-0 flex flex-row items-center justify-evenly bg-card border border-border p-4 rounded-xl ">

  </nav>
</div>
