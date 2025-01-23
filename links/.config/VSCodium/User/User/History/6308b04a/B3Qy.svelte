<script>
  import { cn, accordion } from '@repo/utils';
  import Icon from '@iconify/svelte';

  let {
    classes,
    summary,
    children,
    open = $bindable(false),
    class: className,
    ...restProps
  } = $props();
</script>

<div class="flex flex-col">
  <button
    name="Toggle collapsible"
    aria-label="Toggle collapsible"
    onclick={() => (open = !open)}
    class={cn(
      'flex w-full flex-row items-center',
      classes.itemBaseClasses,
      classes.itemColors,
      className
    )}
    {...restProps}
  >
    {@html summary}
    <span>
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        class={cn('size-6 transition-transform', !open && '-rotate-90')}
      />
    </span>
  </button>
  <div use:accordion={open}>
    {@render children()}
  </div>
</div>
