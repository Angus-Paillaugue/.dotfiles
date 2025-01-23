<script lang="ts">
	import { cn } from "$lib/utils";
	import { LoaderCircle } from "lucide-svelte";

  interface Props {
    children?: () => any;
    class?: string;
    loading?: boolean;
  }
  let { children, class:className, loading, ...restProps }: Props = $props();
  const baseClasses = "bg-background border border-border rounded-lg p-4 flex flex-row items-center gap-4";
</script>

<div class={cn(baseClasses, className)} {...restProps}>
  {#if loading}
    <LoaderCircle class="size-4" />
  {/if}
  {@render children?.()}
</div>
