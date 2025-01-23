<script>
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	const { class: className, max = 1, value = 0, textInside, color="default", textOutside, ...restProps } = $props();

	const colors = {
		default: 'bg-primary',
		yellow: 'bg-amber-500',
		green: 'bg-emerald-500',
		red: 'bg-red-500',
	};
</script>

<ProgressPrimitive.Root
	class={cn(
		'bg-secondary relative h-4 w-full overflow-hidden rounded-full flex flex-row',
		className
	)}
	{...restProps}
>
	<span
		class={cn("h-full w-full transition-all relative flex flex-row items-center justify-center text-primary-foreground text-xs font-semibold text-center", colors[color])}
		style={`width: ${(100 * value) / max}%`}
	>
		{textInside}
	</span>
	<div class="relative grow">
		<div class="inset-0 flex flex-col items-center justify-center absolute">
			<span class="text-primary text-xs font-semibold text-center">
				{textOutside}
			</span>
		</div>
	</div>
</ProgressPrimitive.Root>
