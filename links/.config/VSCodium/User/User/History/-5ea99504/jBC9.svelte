<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button/index.js';
</script>

<svelte:head>
  <title>{$page.status} Error</title>
</svelte:head>

<section
  class="flex h-screen w-full flex-col items-center justify-center gap-4"
>
      {$page.status}
    </h1>
    <p class="text-lg text-muted-foreground">{$page.error?.message}</p>
    <Button href="/">Go to Homepage</Button>
  </div>
</div>
