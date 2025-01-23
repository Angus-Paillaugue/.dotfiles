<script>
  const { children } = $props();
</script>

<main class="flex flex-col min-h-screen">
  <nav class="h-10 bg-neutral-800 w-screen shrink-0 grid grid-cols-3 items-center">
    <h1>Skill Forge</h1>
    <div></div>
    .flex.flex-row.gap-4
  </nav>

  <div class="grow flex flex-col">
    {@render children()}
  </div>
</main>
