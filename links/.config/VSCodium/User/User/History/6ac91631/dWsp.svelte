<script>
  import { cn } from '$lib/utils';
  import { Spinner } from '$lib/components';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

  const { children, class:className, variant="primary", loading=false, ...restProps } = $props();
  const tagName = 'href' in restProps ? 'a' : 'button';
  const baseClasses = "w-full flex flex-row items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2 text-lg font-medium transition-all disabled:cursor-not-allowed";
  const variantClasses = new Map([
    ['primary', 'bg-neutral-800 text-neutral-100'],
  ]);

  let element = $state();

  onMount(() => {
    element.style.width = `${element.getBoundingClientRect().width}px`;
    element.style.height = `${element.getBoundingClientRect().height}px`;
  });
</script>

{#if !variantClasses.has(variant)}
  {#if import.meta.env.DEV}
    <p class="text-red-500">Invalid variant: {variant}</p>
  {/if}
{:else}
  <svelte:element bind:this={element} this={tagName} class={cn(baseClasses, variantClasses.get(variant), className)} {...restProps}>
    {#if loading}
      <span in:fly={{ y:'100%' }}>
        <Spinner class="size-6" />
      </span>
    {:else}
      <div in:slide={{ axis:'x', duration:500 }} class="flex flex-row items-center justify-center gap-2">
        {@render children()}
      </div>
    {/if}
  </svelte:element>
{/if}
