<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    children?: () => any;
    class?: string;
  }
  let { children, class:className }: Props = $props();
  const baseClasses = "bg-background border border-border rounded-lg p-4 flex flex-row items-center gap-4";
</script>

<div class={cn(baseClasses, className)}>
  {@render children?.()}
</div>
