<script>
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils';
  import { Button } from '$lib/components/ui/button';
  import { Menu, X } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';

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

  afterNavigate(() => {
    mobileMenuOpen = false;
  });
</script>

<!-- Mobile side nav -->
{#if mobileMenuOpen}
  <button aria-label="Nav background, click to dismiss" class="fixed md:hidden inset-0 bg-neutral-900/50 z-30" onclick={() => (mobileMenuOpen = false)} transition:fade></button>
  <div class="fixed z-30 top-0 md:hidden bottom-0 left-0 w-2/3 p-6 space-y-10 bg-background" transition:fly={{ x: '-100%' }}>
    <!-- Heading and close button -->
    <div class="flex flex-row items-center justify-between">
      <h3 class="text-lg font-semibold">Logify</h3>
      <Button variant="outline" class="h-fit aspext-square p-1" aria-label="Close nav" onclick={() => (mobileMenuOpen = false)}>
        <X class="size-6" />
      </Button>
    </div>

    <div class="flex flex-col gap-2">
      <a class="text-sm text-muted-foreground font-mono" href="#features">Features</a>
      <a class="text-sm text-muted-foreground font-mono" href="/docs">Docs</a>
      <a class="text-sm text-muted-foreground font-mono" href="/changelog">Changelog</a>
      <a class="text-sm text-muted-foreground font-mono" href="/support">Support</a>
    </div>
  </div>
{/if}

<div class="fixed top-2 z-20 left-2 right-2">
  <div class="max-w-screen-xl mx-auto w-full">
    <nav class={cn("flex transition-all text-primary mx-auto flex-row duration-500 justify-between items-center px-3 h-16 rounded-2xl border", isNavActive ? 'md:w-2/3 w-[90%] bg-background shadow border-border' : 'w-full bg-sidebar border-sidebar')}>
      <a href="/" class="flex flex-row items-center">
        <div class="size-8">
          <img src="/logos/Light.svg" alt="Light Logify logo" class="size-full">
        </div>
        <span class={cn("font-medium text-lg overflow-hidden transition-all duration-500", isNavActive ? 'md:w-0 w-24 max-md:ml-4' : 'w-24 ml-4' )}>Logify</span>
        <div class={cn("h-6 border-l border-border transition-opacity duration-500", isNavActive ? 'md:opacity-100 max-md:opacity-0 md:ml-4' : 'opacity-0')}></div>
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
