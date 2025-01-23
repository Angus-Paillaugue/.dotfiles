<script>
  import { Button } from '$lib/components/ui/button';

  const { hasARegisteredUser } = $props();
</script>

<footer class="rounded-2xl bg-primary text-primary-foreground grid overflow-hidden grid-rows-2">
  <div class="flex flex-col items-center justify-center py-20 gap-8">
    <img src="/logos/Dark.svg" class="size-24" alt="Logify logo">
    <Button href={hasARegisteredUser ? '/log-in' : '/register'} size="sm" variant="secondary">Get started</Button>
  </div>
  <div class="grid grid-cols-3 max-w-screen-xl mx-auto bg-card-foreground relative px-8 py-24">
    <div class="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-primary to-card-foreground"></div>
    <div class="flex flex-col gap-10">
      <div class="flex flex-row gap-2 items-center">
        <img src="/logos/Dark.svg" class="size-6" alt="Logify logo">
        <h5 class="font-bold text-lg">Logify</h5>
      </div>
      <p class="text-muted/50 text-sm">
        Collect, analyze, and visualize your logs with our powerful, Docker-powered platform. Enterprise-grade features, completely free and open source.
      </p>
    </div>
  </div>
</footer>
