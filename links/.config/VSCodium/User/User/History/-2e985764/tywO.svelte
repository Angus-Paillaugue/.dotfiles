<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children }: { class?: string; children?: any } = $props();
</script>

<div
  class={cn(
    'flex size-14 items-center justify-center rounded-full border-2 bg-background p-2 shadow-lg transition-colors hover:border-primary hover:bg-secondary dark:hover:border-primary',
    className
  )}
>
  {@render children?.()}
</div>
