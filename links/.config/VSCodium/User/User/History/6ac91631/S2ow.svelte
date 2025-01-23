<script>
  import { cn } from '$lib/utils';
  import { Spinner } from '$lib/components';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

  const { children, class:className, variant="primary", loading=false, ...restProps } = $props();
  const tagName = 'href' in restProps ? 'a' : 'button';
  const variants = variant.split(' ');
  const baseClasses = "w-full flex flex-row items-center relative justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-lg font-medium transition-all disabled:cursor-not-allowed";
  const variantClasses = new Map([
    ['primary', 'bg-neutral-800 text-neutral-100'],
    ['square', 'p-2 aspect-square']
  ]);

  let element = $state();

  onMount(() => {
    element.style.width = `${element.getBoundingClientRect().width}px`;
    element.style.height = `${element.getBoundingClientRect().height}px`;
  });
</script>

{#if variants.some(v => !variantClasses.has(v))}
  {#if import.meta.env.DEV}
    <p class="text-red-500">Invalid variant: {variants.filter(v => v => !variantClasses.has(v)).join(', ')}</p>
  {/if}
{:else}
  <svelte:element bind:this={element} this={tagName} class={cn(baseClasses, ...variants.map(v => variantClasses.get(v)), className)} {...restProps}>
    {#if loading}
      <span in:fade={{ delay:200, duration:300 }} class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner class="size-6" />
      </span>
    {:else}
      <div transition:slide={{ axis:'x', duration:400 }} class="flex whitespace-nowrap flex-row items-center justify-center gap-2">
        {@render children()}
      </div>
    {/if}
  </svelte:element>
{/if}
