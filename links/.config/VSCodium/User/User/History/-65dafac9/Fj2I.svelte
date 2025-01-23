<script lang="ts">
	import { cn } from "$lib/utils";


  let { class:className, ...restProps } = $props();


  const baseClasses = "border border-border rounded-lg px-4 py-2 text-sm font-medium text-background text-base";
</script>

<input class={cn(baseClasses, className)} {...restProps} />
