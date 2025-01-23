<script>
  import { Button } from '$lib/components';

  const { children } = $props();
</script>

<main class="flex flex-col min-h-screen">
  <nav class="w-screen shrink-0 grid grid-cols-3 items-center p-4">
    <a href="/">
      <h1>Skill Forge</h1>
    </a>
    <div></div>
    <div class="flex flex-row gap-4 items-center justify-end">
      <Button variant="link" class="py-1">Log-In</Button>
      <Button class="py-1">Get started</Button>
    </div>
  </nav>

  <div class="grow flex flex-col">
    {@render children()}
  </div>
</main>
