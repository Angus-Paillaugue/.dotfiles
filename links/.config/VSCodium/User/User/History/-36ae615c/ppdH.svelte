<script>
  import { cn } from '$lib/utils';

  const { children, class: className, href, name, ...restProps } = $props();

  const classes = cn(
    'list-none py-2 font-medium transition-colors px-4 flex flex-row items-center gap-2 hocus:bg-neutral-200/50 dark:hocus:bg-neutral-800 -outline-offset-1 dropdown-item',
    className
  );
</script>

{#if href}
  <a {href} class={classes} {name} aria-label={name} {...restProps}>
    {@render children()}
  </a>
{:else}
  <button class={classes} {name} aria-label={name} {...restProps}>
    {@render children()}
  </button>
{/if}
