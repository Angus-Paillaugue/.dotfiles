<script>
	import { toast } from './index.js';
	import { cn } from '$lib/utils';
	import { CircleCheck, CircleX, TriangleAlert, X, Info } from 'lucide-svelte';
	import { scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';

  const { toast:t } = $props();
	const baseToastClasses = 'border border-neutral-700/50 bg-[#272727] text-neutral-100 relative p-4 rounded-xl overflow-hidden flex flex-col gap-2';
	const progress = tweened(0, {
		duration: t.timeout
	});

  const svgs = {
    error: {
      component: CircleX,
      color: 'text-[#ff4c3e]'
    },
    success: {
      component: CircleCheck,
      color: 'text-[#52ff6e]'
    },
    warning: {
      component: TriangleAlert,
      color: 'text-[#ffba31]'
    },
    info: {
      component: Info,
      color: 'text-[#3cbcfb]'
    }
  }

  onMount(() => {
    if(t.timeout)
    progress.set(100);
  });
</script>

<div
  role="alert"
  class={baseToastClasses}
  transition:scale={{ duration: 300 }}
>
  <!-- Progress -->
  {#if progress}
    <div class="absolute top-0 left-0 right-2 h-1">
      <div class="h-full bg-neutral-600" style="width: {$progress}%;"></div>
    </div>
  {/if}

  <!-- Content -->
  <div class="flex flex-row item-start gap-2">
    <!-- svelte-ignore svelte_component_deprecated -->
    <svelte:component this={svgs[t.type].component} class={cn('size-4 shrink-0', svgs[t.type].color)} />

    <div class="flex flex-col gap-1 grow">
      <!-- Title -->
      <p class="block text-base font-medium leading-4 text-white-400">{t.title}</p>
      <!-- Message -->
      <p class="text-sm font-base text-neutral-400">
        {@html t.message}
      </p>
    </div>
  </div>

  <!-- Close button -->
  <button
    class="absolute right-2 top-2 text-neutral-400"
    name="Remove toast"
    aria-label="Remove toast"
    onclick={() => toast.removeToast(t.id)}
  >
    <X class="size-4" />
  </button>
</div>
