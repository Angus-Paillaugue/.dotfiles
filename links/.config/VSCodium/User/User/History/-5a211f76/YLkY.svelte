<script lang="ts">
  import { cn } from '$lib/utils.js';
  import { tv } from 'tailwind-variants';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

  let {
    ref = $bindable(null),
    class: className,
    variant = 'default',
    inset,
    ...restProps
  }: DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
  } = $props();

  const itemVariants = tv({
    base: 'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
    variants: {
      variant: {
        default: 'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        destructive: 'data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  });
</script>

<DropdownMenuPrimitive.Item
  bind:ref
  class={cn(itemVariants({ variant, className }), inset && 'pl-8', className)}
  {...restProps}
/>
