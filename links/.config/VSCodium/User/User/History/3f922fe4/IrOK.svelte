<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components';
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';

  let cursor = $state();
  let coords = spring(
		{ x: -10, y: -10 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

  onMount(() => {
    document.onmousemove = (e) => {
      coords.set({ x: e.clientX, y: e.clientY });
    }
    document.onmouseenter = () => cursor.style.opacity = `1`;
    document.onmouseleave = () => cursor.style.opacity = `0`;
  });
</script>

<svelte:head>
  <title>{$page.status} Error</title>
</svelte:head>

<div bind:this={cursor} class="w-full h-full z-50 transition-all fixed pointer-events-none max-md:hidden">
  <div class="relative h-full w-full pointer-events-none">
    <div class="absolute -translate-x-1/2 -translate-y-1/2 transition-colors rounded-full shadow-[]" style="box-shadow: 0 0 50px 20px rgba(200, 200, 200, 0.5); width: 0px; height: 0px; top: {$coords.y}px; left: {$coords.x}px;"></div>
  </div>
</div>

<section class="flex h-screen flex-col items-center justify-center gap-4">
  <span class="font-extrabold text-8xl">{$page.status}</span>
  <span class="text-lg">{$page.error.message}</span>
  <Button href="/">Go back</Button>
</section>
