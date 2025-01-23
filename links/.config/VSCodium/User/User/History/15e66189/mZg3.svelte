<script>
  import { House, Shirt, UserRound, Plus } from 'lucide-svelte';
  import { page } from '$app/stores';

  /** @type {import('./$types').LayoutData} */
  const { children } = $props();

  let isNested = $derived($page.url.pathname.slice(4).split('/').length > 2);
  $inspect(isNested)
</script>

<div class="grow max-w-screen-md mx-auto flex flex-col w-full">
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
