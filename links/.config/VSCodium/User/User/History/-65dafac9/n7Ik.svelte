<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    type?: string;
    class?: string;
  }

  let { type="text", class:className, ...restProps }: Props = $props();


  const baseClasses = "border border-border rounded-lg px-4 py-2 text-sm font-medium text-background text-base";
</script>

<input {type} class={cn(baseClasses, className)} {...restProps} />
