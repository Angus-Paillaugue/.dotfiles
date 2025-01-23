<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "";
  export { className as class };
</script>

<div
  class={cn(
    "flex size-14 items-center justify-center rounded-full border-2 bg-background p-2 shadow-lg",
    className
  )}
>
  <slot></slot>
</div>
