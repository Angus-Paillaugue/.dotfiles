<script lang="ts">
    import { page } from '$app/stores';
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md text-center">
      <!-- <div class="mx-auto h-12 w-12 text-primary" /> -->
      <h1 class="mt-4 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">404</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Oops, it looks like the page you're looking for doesn't exist.
      </p>
      <div class="mt-6">
        <Button href="/">
          Go to Homepage
        </Button>
      </div>
    </div>
  </div>
