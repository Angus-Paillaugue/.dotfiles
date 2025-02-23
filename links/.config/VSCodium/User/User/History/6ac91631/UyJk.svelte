<script>
  import { cn } from '$lib/utils';
  import { Spinner } from '$lib/components';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

  const { children, class:className, variant:propVariant="primary", loading=false, ...restProps } = $props();
  const tagName = 'href' in restProps ? 'a' : 'button';
  const baseClasses = "w-full flex flex-row items-center relative justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-lg font-medium transition-colors disabled:cursor-not-allowed";
  const variantClasses = new Map([
    ['primary', 'bg-neutral-800 text-neutral-100'],
    ['secondary', 'rounded-xl bg-neutral-700 w-fit px-3 py-1 text-base hover:bg-neutral-700/50'],
    ['square', 'p-2 aspect-square'],
    ['backButton', 'size-9 rounded-full bg-neutral-900'],
    ['ghost', 'bg-transparent'],
    ['small', 'px-3 py-1 text-base'],
    ['secondaryInverted', 'w-fit gap-2 rounded-lg px-3 py-1 text-base hover:bg-neutral-900/50']
  ]);

  let variants = $derived(propVariant.split(' '));
  let element = $state();

  onMount(() => {
    setSize()

    window.addEventListener('resize', setSize);

    return () => {
      window.removeEventListener('resize', setSize);
    }
  });

  function setSize() {
    if(!element || loading) return;
    element.style.width = 'auto';
    element.style.height = 'auto';
    element.style.width = `${element.getBoundingClientRect().width}px`;
    element.style.height = `${element.getBoundingClientRect().height}px`;
  }
</script>

{#if variants.some(v => !variantClasses.has(v))}
  <p class="text-red-500">Invalid variant: {variants.filter(v => !variantClasses.has(v)).join(', ')}</p>
{:else}
  <svelte:element bind:this={element} this={tagName} class={cn(baseClasses, ...variants.map(v => variantClasses.get(v)), className)} {...restProps}>
    {#if loading}
      <span in:fade={{ delay:200, duration:300 }} class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner class="size-6" />
      </span>
    {:else}
      <div transition:slide={{ axis:'x', duration:400 }} class="flex whitespace-nowrap flex-row items-center justify-center gap-2">
        {@render children?.()}
      </div>
    {/if}
  </svelte:element>
{/if}
