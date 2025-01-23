<script>
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { good = true, tooltip = "Solved", class: className } = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<div class={cn('relative size-3 shrink-0', className)}>
			<div
				class={cn('rounded-full absolute inset-0', good ? 'bg-green-400' : 'bg-red-500')}
				style="animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"
			></div>
			<div class={cn('rounded-full absolute inset-0', good ? 'bg-green-400' : 'bg-red-500')}></div>
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content class="capitalize">
		{tooltip}
	</Tooltip.Content>
</Tooltip.Root>
