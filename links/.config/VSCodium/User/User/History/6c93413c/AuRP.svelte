<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex h-svh flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-sm text-center space-y-4">
    <h1 class="font-bold text-4xl font-mono tracking-tight text-foreground">{$page.status}</h1>
    <p class="text-lg text-muted-foreground">{$page.error?.message}</p>
    <Button href="/">
      Go to Homepage
      </Button>
  </div>
</div>
