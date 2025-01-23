<script>
  import { cn } from "$lib/utils";
  
  const { class:className, ...restProps } = $props();
</script>

<div class={cn("w-full border-b border-main dark:border-main-dark h-0 my-2", className)} {...restProps}></div>
