<script>
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import * as Alert from '$lib/components/ui/alert';

	import { HardDrive } from 'lucide-svelte';
	const { disks } = $props();
</script>

<a href="/disks" class="hover:underline transition-colors w-fit mb-4"><h2 class="w-fit">Disks</h2></a>
{#if disks.length === 0}
	<Alert.Root variant="destructive" class="mb-8">
		<Alert.Title class="m-0">Could not list disks mounted to the system!</Alert.Title>
	</Alert.Root>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
		<!-- Disks usage -->
		{#each disks as disk}
			{@const usage = parseInt(disk.usage.slice(0, -1))}
			<Card>
				<CardContent class="p-6">
					<div class="flex flex-col gap-4 w-full">
						<div class="flex flex-row gap-4 items-center">
							<HardDrive class="size-12" />
							<div class="flex flex-col h-full justify-between">
								<h4>{disk.size}</h4>
								<small>{disk.mount}</small>
							</div>
						</div>
						<Progress
							value={usage}
							color={usage > 70 ? usage > 90 ? 'red' : 'yellow' : 'green'}
							max={100}
							textInside={disk.used}
							textOutside={disk.available}
							class="w-full"
						/>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>
{/if}
