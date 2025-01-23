<script>
  const { children } = $props();
</script>

<main class="flex flex-col min-h-screen">
  <nav class="h-10 bg-neutral-800 w-screen">

  </nav>

  <div class="grow flex flex-col">
    {@render children()}
  </div>
</main>
