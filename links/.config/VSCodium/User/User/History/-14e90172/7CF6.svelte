<script>
  import Nav from './Nav.svelte';
  import { pageMetadata } from '$lib/stores';
  import { Button } from '$lib/components/ui/button';

  pageMetadata.set({
    title: 'Home',
    description: 'Logify is a platform that allows you to log your data and get insights in minutes.',
    breadcrumbs: []
  });

  const { data } = $props();
  const { hasARegisteredUser } = data;
</script>

<Nav {hasARegisteredUser} />
<div class="max-w-screen-xl w-full mx-auto p-1">
  <!-- Hero -->
  <main class="w-full space-y-24">
    <div class="rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-secondary px-4 md:px-6 py-12 aspect-video md:py-24 w-full">
      <div class="md:w-2/3 text-center text-wrap-balance space-y-4">
        <h1 class="text-6xl text-primary font-semibold leading-[5rem]">
          Transform Your Logs into Actionable Insights
        </h1>
        <h2 class="text-xl font-base text-muted-foreground">
          Collect, analyze, and visualize your logs with our powerful, Docker-powered platform. Enterprise-grade features, completely free and open source.
        </h2>

        <Button href={hasARegisteredUser ? "/log-in" : '/register'}>
          Get started
        </Button>
      </div>
    </div>

    <!-- Bento -->
    <div class="flex flex-col">
      <h2 class="text-4xl font-semibold text-neutral-800 text-center">Everything You Need</h2>
      <h3 class="text-lg font-medium text-neutral-600 text-center">Powerful features to help you manage and understand your logs better</h3>
      <div class="grid-grid-cols-1 lg:gris-cols-3 gap-8">

      </div>
    </div>

    <div class="h-screen"></div>

    <!-- Footer -->
    <footer class="bg-primary rounded-2xl px-8 py-24">

    </footer>
  </main>
</div>
