<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "";
  export { className as class };
</script>

<div
  class={cn(
    "flex size-14 items-center justify-center rounded-full border-2 bg-background p-2 shadow-lg transition-colors hover:bg-amber-50 hover:border-amber-600 dark:hover:border-amber-400",
    className
  )}
>
  <slot></slot>
</div>
