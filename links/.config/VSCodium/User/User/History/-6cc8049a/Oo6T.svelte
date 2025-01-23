<script>
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { isOnline = true, class: className } as { isOnline: Boolean; class?: string} = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<div class={cn('relative size-3 shrink-0', className)}>
			<div
				class={cn('rounded-full absolute inset-0', isOnline ? 'bg-green-400' : 'bg-red-500')}
				style="animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"
			></div>
			<div class={cn('rounded-full absolute inset-0', isOnline ? 'bg-green-400' : 'bg-red-500')}></div>
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content class="capitalize">
		{isOnline ? 'Running' : 'Stopped'}
	</Tooltip.Content>
</Tooltip.Root>
