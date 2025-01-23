<script>
  import { House, Shirt, UserRound, Plus, Undo2 } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { Button } from '$lib/components';

  /** @type {import('./$types').LayoutData} */
  const { children } = $props();

  let isNested = $derived($page.url.pathname.slice(4).split('/').length > 2);
</script>

<div class="grow max-w-screen-md mx-auto flex flex-col w-full">
  {#if isNested}
    <header class="flex flex-row gap-4 items-center border border-border bg-card p-4 rounded-xl mb-4">
      <Button variant="backButton" onclick={() => (window.history.back())}>
        <Undo2 class="size-5" />
      </Button>
    </header>
  {/if}
  <main class="flex flex-col grow">
    {@render children?.()}
  </main>
  <nav class="shrink-0 flex flex-row items-center justify-evenly bg-card border border-border px-4 py-2 rounded-xl mb-4 mt-6 w-full">
    <a href="/app" class="p-2 rounded-full">
      <House class="size-6" />
    </a>
    <a href="/app" class="p-3 rounded-full -mt-8 bg-card border border-border">
      <Plus class="size-8" />
    </a>
    <a href="/app" class="p-2 rounded-full">
      <Shirt class="size-6" />
    </a>
    <a href="/app" class="p-2 rounded-full">
      <UserRound class="size-6" />
    </a>
  </nav>
</div>
