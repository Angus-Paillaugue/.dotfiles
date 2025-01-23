<script>
  import { cn } from "$lib/utils";
  import { getContext } from 'svelte';

  const { children, class:className, href, ...restProps } = $props();
  const { open } = getContext('dropdown');

  const getTabindex = () => {
    return open ? 0 : -1;
  };

  const classes = cn("list-none py-2 font-medium transition-colors text-base px-4 flex flex-row items-center gap-2 bg-inherit hover:bg-neutral-200 dark:bg-neutral-800 -outline-offset-1", className);

  let tabindex = $state(getTabindex());

  $effect(() => {
    tabindex = getTabindex();
  });

  $inspect(tabindex, open)
</script>


{#if href}
  <a {href} {tabindex} class={classes} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={classes} {tabindex} {...restProps}>
    {@render children()}
  </button>
{/if}
