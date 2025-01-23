<script>
  import { cn } from '$lib/utils';

  /**
   * @typedef Props
   * @property {string} class - The CSS class for the component.
   * @property {Function} children - The children of the component.
   * @property {Object} restProps - Additional props for the component.
   */

  /** @type {Props} */
  const { children, class: className, ...restProps } = $props();
</script>

<div class={cn('collapsible-group flex flex-col gap-0', className)} {...restProps}>
  {@render children()}
</div>

<style>
  :global(.collapsible-group .collapsible) {
    @apply m-0 rounded-none border-t-0 first:rounded-t-md first:border-t last:rounded-b-md;
  }
</style>
