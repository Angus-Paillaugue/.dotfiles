<script>
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils';
  import { pageMetadata } from '$lib/stores';
  import { Button } from '$lib/components/ui/button';
  import { Menu } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';

  pageMetadata.set({
    title: 'Home',
    description: 'Logify is a platform that allows you to log your data and get insights in minutes.',
    breadcrumbs: []
  });

  const { hasARegisteredUser } = $props();

  let isNavActive = $state(false);
  let mobileMenuOpen = $state(false);

  const onScrollHandler = () => {
    isNavActive = window.scrollY > 0;
  };

  onMount(() => {
    onScrollHandler();
    window.addEventListener('scroll', onScrollHandler);

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });
</script>

{#if mobileMenuOpen}
  <div class="fixed inset-0 bg-neutral-900/50 z-30" onclick={() => (mobileMenuOpen = false)} transition:fade></div>
  <div class="fixed z-30 top-0 bottom-0 left-0 w-2/3 bg-background" transition:fly={{ x: '-100%' }}></div>
{/if}

<div class="fixed top-2 left-2 right-2">
  <div class="max-w-screen-xl mx-auto w-full">
    <nav class={cn("flex transition-all z-20 text-primary mx-auto flex-row duration-500 justify-between items-center px-3 h-16 rounded-2xl border", isNavActive ? 'md:w-2/3 w-[90%] bg-background shadow border-border' : 'w-full bg-sidebar border-sidebar')}>
      <a href="/" class="flex flex-row items-center">
        <div class="size-8">
          <img src="/logos/Light.svg" alt="Light Logify logo" class="size-full">
        </div>
        <span class={cn("font-medium text-lg overflow-hidden transition-all duration-500", isNavActive ? 'md:w-0' : 'w-24 ml-4' )}>Logify</span>
        <div class={cn("h-6 border-l border-border transition-opacity duration-500", isNavActive ? 'opacity-100 ml-4' : 'opacity-0')}></div>
      </a>

      <div class="hidden md:flex flex-row items-center">
        <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="#features">Features</a>
        <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/docs">Docs</a>
        <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/changelog">Changelog</a>
        <a class="text-sm text-muted-foreground font-mono px-2 py-1 hover:bg-secondary rounded-lg transition-colors duration-300" href="/support">Support</a>
      </div>

      <!-- Desktop CTA -->
      {#if hasARegisteredUser}
        <Button variant='outline' href="/log-in" class={cn("text-base font-medium duration-500 max-md:hidden", isNavActive && 'bg-primary text-primary-foreground border-primary')}>
          Log-in
        </Button>
      {:else}
        <Button variant='outline' href="/register" class={cn("text-base font-medium duration-500 max-md:hidden", isNavActive && 'bg-primary text-primary-foreground border-primary')}>
          Register
        </Button>
      {/if}

      <!-- Expand nav on mobile button -->
      <Button variant="outline" class="md:hidden p-2 aspect-square h-fit" onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
        <Menu class="size-6" />
      </Button>
    </nav>
  </div>
</div>

<!-- Spacer -->
<div class="h-20"></div>
