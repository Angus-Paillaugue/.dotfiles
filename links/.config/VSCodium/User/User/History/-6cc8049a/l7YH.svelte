<script>
	import { cn } from '$lib/utils';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let { isOnline = true, class: className = '' } = $props();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<div class={cn('relative size-3 shrink-0', className)}>
			<div
				class={cn('rounded-full absolute inset-0 animate-[ping_3s_ease-in-out_infinite]', isOnline ? 'bg-green-400' : 'bg-red-500')}
			></div>
			<div class={cn('rounded-full absolute inset-0', isOnline ? 'bg-green-400' : 'bg-red-500')}></div>
		</div>
	</Tooltip.Trigger>
	<Tooltip.Content class="capitalize">
		{isOnline ? 'Online' : 'Offline'}
	</Tooltip.Content>
</Tooltip.Root>
