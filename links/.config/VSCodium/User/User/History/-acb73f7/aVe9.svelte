<script>
	import { cn } from "$lib/utils";
	let className = undefined;
	export { className as class };
</script>

<div
	class={cn("bg-card text-card-foreground rounded-lg border shadow-sm", className)}
	{...$$restProps}
>
	<slot />
</div>
