<script lang="ts">
  import { cn } from "$lib/utils";
	import { TriangleAlert } from "lucide-svelte";
  interface Props {
    children?: () => any;
    class?: string;
  }

  let { children, class:className, ...restProps }: Props = $props();
</script>

<div class={cn("p-4 border border-destructive rounded-lg flex flex-row items-center gap-4", className)} role="alert">
  <!-- <TriangleAlert class="size-6 text-destructive" /> -->
  {@html children?.()}
</div>
