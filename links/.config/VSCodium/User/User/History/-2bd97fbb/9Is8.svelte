<script>
  import { Button } from '$lib/components/ui/button';

  const { hasARegisteredUser } = $props();
</script>

<footer class="grid grid-rows-2 overflow-hidden rounded-2xl bg-primary text-primary-foreground">
  <div class="relative flex flex-col items-center justify-center gap-8 py-20">
    <img src="/logos/Dark.svg" class="size-24" alt="Logify logo" />
    <Button href={hasARegisteredUser ? '/log-in' : '/register'} size="sm" variant="secondary"
      >Get started</Button
    >
    <div
      class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-primary to-card-foreground"
    ></div>
  </div>
  <div class="relative mx-auto grid max-w-screen-xl bg-card-foreground px-8 py-24 lg:grid-cols-3 gap-6">
    <div class="flex flex-col gap-6">
      <div class="flex flex-row items-center gap-2">
        <img src="/logos/Dark.svg" class="size-6" alt="Logify logo" />
        <h5 class="text-lg font-bold">Logify</h5>
      </div>
      <p class="text-sm text-muted/50">
        Collect, analyze, and visualize your logs with our powerful, Docker-powered platform.
        Enterprise-grade features, completely free and open source.
      </p>
      <!-- Socials -->
      <div class="flex flex-row gap-4">
        <!-- Github -->
        <a href="https://github.com/Angus-Paillaugue/Logify">
          <svg role="img" viewBox="0 0 24 24" class="size-6 fill-primary-foreground" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
      </div>
    </div>

    <div class="lg:col-span-2 grid lg:grid-cols-2 gap-4">
      <div class="flex flex-col gap-2 lg:w-1/2 lg:mx-auto">
        <h5 class="text-lg font-bold font-mono">Product</h5>
        <a href="/#features" class="text-sm text-muted/50">Features</a>
        <a href="/docs" class="text-sm text-muted/50">Docs</a>
        <a href="/changelog" class="text-sm text-muted/50">Changelog</a>
      </div>
    </div>
  </div>
</footer>
