<script>
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	
	import { HardDrive } from 'lucide-svelte';
	const { disks } = $props();
</script>

<Button variant="link" href="/disks"><h2 class="text-2xl font-semibold mb-4">Disks</h2></Button>
{#if disks.length === 0}
	<Alert.Root variant="destructive" class="mb-8">
		<Alert.Title class="m-0">Could not list disks mounted to the system!</Alert.Title>
	</Alert.Root>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
		<!-- Disks usage -->
		{#each disks as disk}
			<Card>
				<CardContent class="p-6">
					<div class="flex flex-col gap-4 w-full">
						<div class="flex flex-row gap-4 items-center">
							<HardDrive class="size-12" />
							<div class="flex flex-col h-full justify-between">
								<p class="text-lg font-semibold">{disk.size}</p>
								<p class="text-sm text-muted-foreground">{disk.mount}</p>
							</div>
						</div>
						<Progress
							value={disk.usage.slice(0, -1)}
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
