<script>
  import { House} from 'lucide-svelte'
  /** @type {import('./$types').LayoutData} */
  const { children } = $props();
</script>

<div class="grow max-w-screen-md mx-auto flex flex-col w-full">
  <main class="flex flex-col grow">
    {@render children?.()}
  </main>
  <nav class="shrink-0 flex flex-row items-center justify-evenly bg-card border border-border p-4 rounded-xl my-4 w-full">
    <a href="/app">
      <House class="size-6" />
    </a>
  </nav>
</div>
