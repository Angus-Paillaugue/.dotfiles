<script>
  import { page } from '$app/stores';
  import { Button } from '$lib/components';
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { scale } from 'svelte/transition';

  let cursor = $state();
  let cursorScale = $state(1);
  let cursorActive = $state(false);
  let coords = spring(
    { x: -10, y: -10 },
    {
      stiffness: 0.05,
      damping: 0.25
    }
  );

  onMount(() => {
    document.onmousemove = (e) => {
      cursorScale = e.target.closest("a, button") ? 1.5 : 1;
      coords.set({ x: e.clientX, y: e.clientY });
    };
    document.onmouseenter = () => (cursor.style.opacity = `1`);
    document.onmouseleave = () => (cursor.style.opacity = `0`);
    document.onmousedown = () => (cursorActive = true);
    document.onmouseup = () => (cursorActive = false);

    return () => {
      document.onmousemove = null;
      document.onmouseenter = null;
      document.onmouseleave = null;
      document.onmousedown = null;
      document.onmouseup = null;
    };
  });
</script>

<svelte:head>
  <title>{$page.status} Error</title>
</svelte:head>

<div class="relative h-full w-full pointer-events-none z-10 max-md:hidden" bind:this={cursor}>
  <div
    class="absolute transition-transform duration-500"
    style="top: {$coords.y}px; left: {$coords.x}px; transform: translate(-50%, -50%) rotate({cursorScale === 1 ? 0 : 12}deg) scale({cursorActive ? 0.5 * cursorScale : cursorScale});"
  >
    {#if cursorScale === 1}
      <div in:scale={{ duration:500 }}>
        <Icon icon="material-symbols:dangerous-outline-rounded" class="size-10 text-red-600" />
      </div>
    {:else}
      <div in:scale={{ duration:500 }}>
        <Icon icon="material-symbols:back-hand-rounded" class="size-10 text-blue-600 rotate-12" />
      </div>
    {/if}
  </div>
</div>

<section class="flex h-screen flex-col items-center justify-center gap-4 cursor-none">
  <h1 class="font-extrabold text-8xl transition-all duration-500 hover:text-shadow-[0px_0px_15px_rgba(0,_0,_0,_1)]">{$page.status}</h1>
  <span class="text-lg">{$page.error.message}</span>
  <Button href="/" class="hover:cursor-none">Go back</Button>
</section>
