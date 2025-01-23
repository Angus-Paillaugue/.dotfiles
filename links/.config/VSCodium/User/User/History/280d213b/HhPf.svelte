<script>
  import { Button } from '$lib/components';

  const { children } = $props();
</script>

<main class="flex flex-col min-h-screen">
  <nav class="h-12 bg-neutral-800 w-screen shrink-0 grid grid-cols-3 items-center px-4">
    <a href=""></a>
    <h1>Skill Forge</h1>
    <div></div>
    <div class="flex flex-row gap-4 items-center justify-end">
      <Button class="py-1">Log-In</Button>
    </div>
  </nav>

  <div class="grow flex flex-col">
    {@render children()}
  </div>
</main>
