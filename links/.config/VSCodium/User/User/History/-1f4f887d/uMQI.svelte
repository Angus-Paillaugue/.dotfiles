<script>
  import { cn } from "$lib/utils";
  import { getContext } from 'svelte';

  const { children, class:className, href, ...restProps } = $props();

  const { open } = getContext('dropdown');

  const classes = cn("list-none py-2 font-medium transition-colors text-base px-4 flex flex-row items-center gap-2 bg-inherit hover:bg-neutral-200 dark:bg-neutral-800 -outline-offset-1", className);
</script>


{#if open}
  {#if href}
    <a {href} class={classes} {...restProps}>
      {@render children()}
    </a>
  {:else}
    <div class={classes} {...restProps}>
      {@render children()}
    </div>
  {/if}
{/if}
