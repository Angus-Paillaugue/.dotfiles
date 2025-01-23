<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components';
</script>

<svelte:head>
  <title>{$page.status} Error</title>
</svelte:head>

<section class="flex h-screen flex-col items-center justify-center gap-4">
  <h1
    class="text-8xl font-extrabold transition-all duration-500 hover:text-shadow-[0px_0px_15px_rgba(0,_0,_0,_1)] dark:hover:text-shadow-[0px_0px_15px_rgba(255,_255,_255,_1)]"
  >
    {$page.status}
  </h1>
  <span class="text-lg">{$page.error.message}</span>
  <Button onclick={() => window.history.back()} name="Go back"
    >Go back</Button
  >
</section>
