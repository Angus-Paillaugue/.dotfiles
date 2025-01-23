<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    children?: () => any;
  }
  let { children }: Props = $props();
  const baseClasses = "bg-background border border-border rounded-lg p-4 flex flex-row items-center gap-4";
</script>

<div class={cn}>
  {@render children?.()}
</div>
