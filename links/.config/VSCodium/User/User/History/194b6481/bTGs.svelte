<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils.js';
  import { tv } from 'tailwind-variants';

  let {
    ref = $bindable(null),
    class: className,
    inset,
    ...restProps
  }: ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
  } = $props();

  const variants = tv({
    variants: {
      default: '',
      destructive: ''
    }
  });
</script>

<ContextMenuPrimitive.Item
  bind:ref
  class={cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
    inset && 'pl-8',
    className
  )}
  {...restProps}
/>
