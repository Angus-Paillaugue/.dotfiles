<script>
  import { cn } from '$lib/utils';
  import Icon from '@iconify/svelte';
  import { accordion } from '$lib/utils';

  let { classes, summary, children, open = $bindable(false), ...restProps } = $props();
</script>

<div class="flex flex-col">
  <button
    onclick={() => (open = !open)}
    {...restProps}
    class={cn('flex w-full flex-row items-center', classes.itemBaseClasses, classes.itemColors)}
  >
    {@html summary}
    <span>
      <Icon
        icon="material-symbols:keyboard-arrow-down-rounded"
        class={cn("size-6 transition-transform", !open && '-rotate-90'})}
      />
    </span>
  </button>
  <div use:accordion={open}>
    {@render children()}
  </div>
</div>
