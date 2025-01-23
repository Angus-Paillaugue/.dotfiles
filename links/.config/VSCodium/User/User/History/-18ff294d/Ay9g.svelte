<script>
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { ScrollArea } from "$lib/components/ui/scroll-area/";
	import { Database } from 'lucide-svelte';
	import Status from '../lib/components/Status.svelte';
	import { cn } from '$lib/utils';
	import { formatDate } from '$lib/utils';

	const { databases } = $props();
	let databaseModalDatabaseIndex = $state(0);
</script>

<!-- Databases -->
<h2 class="text-2xl font-semibold mb-4">Databases</h2>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
	<!-- Databases -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between">
			<CardTitle>Databases</CardTitle>
			<Status isUp={databases.isUp} />
		</CardHeader>
		<CardContent>
			{#if !databases.isUp}
				<Alert.Root variant="destructive">
					<Alert.Title class="m-0">{databases.message ?? 'Error fetching databases'}</Alert.Title>
				</Alert.Root>
			{:else}
				<ScrollArea class="md:max-h-[300px] flex flex-col items-center w-full">
					{#each databases.list as database, index}
						<button
							class={cn(
								'w-full flex flex-row gap-4 items-center p-4 border-b last:border-none transition-colors hover:bg-secondary rounded',
								index === databaseModalDatabaseIndex && 'bg-secondary'
							)}
							onclick={() => {
								databaseModalDatabaseIndex = index;
							}}
						>
							<Database class="size-6" />
							<p class="text-lg font-semibold">{database.name}</p>
							<p class="ml-auto">
								{database.size} Mb
							</p>
						</button>
					{/each}
				</ScrollArea>
			{/if}
		</CardContent>
	</Card>

	<!-- Database metrics -->
	{#if databases.isUp}
		<Card>
			<CardHeader>
				<CardTitle>Database metrics</CardTitle>
			</CardHeader>
			<CardContent>
				<table class="table-fixed border-collapse text-sm w-full">
					<thead>
						<tr>
							<th class="py-0.5 px-2">Property</th>
							<th class="py-0.5 px-2">Value</th>
						</tr>
					</thead>
					<tbody>
						{#if databases.list[databaseModalDatabaseIndex]}
							{#each Object.entries(databases.list[databaseModalDatabaseIndex]) as [key, value]}
								<tr class="border-y">
									<td class="py-0.5 px-2">{key}</td>
									<td class="py-0.5 px-2">{value instanceof Date ? formatDate(value) : value}</td>
								</tr>
							{/each}
						{:else}
							<tr>
								<td colspan="2">No database selected</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</CardContent>
		</Card>
	{/if}
</div>
