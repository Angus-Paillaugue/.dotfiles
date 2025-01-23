<script>
  import { House} from 'lucide-svelte';
  import { cn } from '$lib/utils';
  
  /** @type {import('./$types').LayoutData} */
  const { children } = $props();

  let activeNavItem = $state('home');
</script>

<div class="grow max-w-screen-md mx-auto flex flex-col w-full">
  <main class="flex flex-col grow">
    {@render children?.()}
  </main>
  <nav class="shrink-0 flex flex-row items-center justify-evenly bg-card border border-border px-4 py-2 rounded-xl my-4 w-full">
    <a href="/app" class="p-2 rounded-full bg-neutral-700/50">
      <House class="size-6" />
    </a>
  </nav>
</div>
