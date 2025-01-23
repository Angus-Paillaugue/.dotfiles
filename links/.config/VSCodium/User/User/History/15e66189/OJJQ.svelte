<script>
  import { House, Shirt, UserRound, Plus, Undo2 } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { Button } from '$lib/components';
  TypeError: __vite_ssr_import_4__.getTitle is not a function
    at _layout (/home/angus/Documents/perso/fashion-vault-v2/src/routes/app/+layout.svelte:11:31)
    at children (/home/angus/Documents/perso/fashion-vault-v2/.svelte-kit/generated/root.svelte:76:6)
    at _layout (/home/angus/Documents/perso/fashion-vault-v2/src/routes/+layout.svelte:10:19)
    at Root (/home/angus/Documents/perso/fashion-vault-v2/.svelte-kit/generated/root.svelte:65:3)
    at Module.render (/home/angus/Documents/perso/fashion-vault-v2/node_modules/.pnpm/svelte@5.1.14/node_modules/svelte/src/internal/server/index.js:117:2)
    at Function._render [as render] (/home/angus/Documents/perso/fashion-vault-v2/node_modules/.pnpm/svelte@5.1.14/node_modules/svelte/src/legacy/legacy-server.js:27:18)
    at Module.render_response (/home/angus/Documents/perso/fashion-vault-v2/node_modules/.pnpm/@sveltejs+kit@2.8.0_@sveltejs+vite-plugin-svelte@4.0.0_svelte@5.1.14_vite@5.4.11_@types+node@_7ivp2ejm6kqt45qq4g5x3kxrbm/node_modules/@sveltejs/kit/src/runtime/server/page/render.js:171:29)
    at async Module.render_page (/home/angus/Documents/perso/fashion-vault-v2/node_modules/.pnpm/@sveltejs+kit@2.8.0_@sveltejs+vite-plugin-svelte@4.0.0_svelte@5.1.14_vite@5.4.11_@types+node@_7ivp2ejm6kqt45qq4g5x3kxrbm/node_modules/@sveltejs/kit/src/runtime/server/page/index.js:302:10)
    at async resolve (/home/angus/Documents/perso/fashion-vault-v2/node_modules/.pnpm/@sveltejs+kit@2.8.0_@sveltejs+vite-plugin-svelte@4.0.0_svelte@5.1.14_vite@5.4.11_@types+node@_7ivp2ejm6kqt45qq4g5x3kxrbm/node_modules/@sveltejs/kit/src/runtime/server/respond.js:454:18)

  /** @type {import('./$types').LayoutData} */
  const { children } = $props();

  let isNested = $derived($page.url.pathname.slice(4).split('/').length > 2);
  let pageName = $derived(SEO.getTitle());
</script>

<div class="grow max-w-screen-md mx-auto flex flex-col w-full">
  {#if isNested}
    <header class="flex flex-row gap-4 items-center border border-border bg-card p-4 rounded-xl mb-4">
      <Button variant="backButton">
        <Undo2 class="size-5" />
      </Button>
      <p>{pageName}</p>
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
