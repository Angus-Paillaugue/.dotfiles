<script>
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils';
  import { pageMetadata } from '$lib/stores';
  import { Button } from '$lib/components/ui/button';

  pageMetadata.set({
    title: 'Home',
    description: 'Logify is a platform that allows you to log your data and get insights in minutes.',
    breadcrumbs: []
  });

  const { hasARegisteredUser } = $props();

  let isNavActive = $state(false);

  const onScrollHandler = () => {
    isNavActive = window.scrollY > 5;
  };

  onMount(() => {
    onScrollHandler();
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });
</script>


<div class="max-w-screen-xl">
  <nav class={cn("sticky flex transition-all z-20 text-primary mx-auto flex-row duration-500 justify-between items-center top-2 px-3 h-16 rounded-2xl border", isNavActive ? 'w-2/3 bg-background shadow border-border' : 'w-full bg-sidebar border-sidebar')}>
    <a href="/" class="flex flex-row items-center">
      <div class="size-8">
        <img src="/logos/Light.svg" alt="Light Logify logo" class="size-full">
      </div>
      <span class={cn("font-medium text-lg overflow-hidden transition-all duration-500", isNavActive ? 'w-0' : 'w-24 ml-4' )}>Logify</span>
      <div class={cn("h-6 border-l border-border transition-opacity duration-500", isNavActive ? 'opacity-100 ml-4' : 'opacity-0')}></div>
    </a>

    <div class="flex flex-row items-center">
      <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="#features">Features</a>
      <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/docs">Docs</a>
      <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/changelog">Changelog</a>
      <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/support">Support</a>
    </div>

    {#if hasARegisteredUser}
      <Button variant='outline' href="/log-in" class={cn("text-base font-medium duration-500", isNavActive && 'bg-primary text-primary-foreground border-primary')}>
        Log-in
      </Button>
    {:else}
      <Button href="/register" class="text-base font-medium">
        Register
      </Button>
    {/if}
  </nav>
</div>
