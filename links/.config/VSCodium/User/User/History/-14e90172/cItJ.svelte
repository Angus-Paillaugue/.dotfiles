<script>
  import Bento from './Bento.svelte';
  import { pageMetadata } from '$lib/stores';
  import { Button } from '$lib/components/ui/button';

  pageMetadata.set({
    title: 'Home',
    description:
      'Logify is a platform that allows you to log your data and get insights in minutes.',
    breadcrumbs: []
  });

  const { data } = $props();
  const { hasARegisteredUser } = data;
</script>

<div class="mx-auto w-full max-w-screen-xl p-1">
  <!-- Hero -->
  <main class="w-full space-y-24">
    <div
      class="flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-secondary px-4 py-12 md:px-6 md:py-24"
    >
      <div class="space-y-4 text-center text-wrap-balance md:w-2/3">
        <h1
          class="text-4xl font-semibold leading-[3rem] text-primary md:text-6xl md:leading-[5rem]"
        >
          Transform Your Logs into Actionable Insights
        </h1>
        <h2 class="mtext-base d:text-xl font-base text-muted-foreground">
          Collect, analyze, and visualize your logs with our powerful, Docker-powered platform.
          Enterprise-grade features, completely free and open source.
        </h2>

        <Button href={hasARegisteredUser ? '/log-in' : '/register'}>Get started</Button>
      </div>
    </div>

    <Bento />

    <div class="min-h-screen flex flex-col items-center">
      <div class="w-full h-fit flex flex-row">
        <div class="grid grid-rows-3 min-w-[35%] shrink-0 rounded-l-lg overflow-hidden border border-border">
          <div class="size-full bg-secondary flex flex-col gap-1 p-4">
            <h2 class="text-lg font-medium">Docker powered</h2>
            <p class="text-muted-foreground text-sm font-normal">Use the power of docker to deploy effortlessly.</p>
          </div>
          <div class="size-full bg-secondary flex flex-col gap-1 p-4">
            <h2 class="text-lg font-medium">Title</h2>
            <p class="text-muted-foreground text-sm font-normal">Description</p>
          </div>
          <div class="size-full bg-secondary flex flex-col gap-1 p-4">
            <h2 class="text-lg font-medium">Title</h2>
            <p class="text-muted-foreground text-sm font-normal">Description</p>
          </div>
        </div>
        <!-- Main content -->
        <div class="h-full border border-border flex flex-col items-center justify-center grow max-md:border-l-0 w-full">

        </div>
      </div>
    </div>

    <div class="h-screen"></div>

    <!-- Footer -->
    <footer class="rounded-2xl bg-primary px-8 py-24"></footer>
  </main>
</div>
