<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card"
	import * as Table from "$lib/components/ui/table"
	import { Logs, ArrowUpRight, OctagonAlert, Skull, TriangleAlert } from "lucide-svelte";
	import { pageMetadata } from "$lib/stores";
	import { API_URL } from "$lib/constants";
	import { type LogLevel, type Log } from "../../app.d";
	import { toast } from "svelte-sonner";
	import { onMount } from "svelte";
	import { cn } from "$lib/utils";

	pageMetadata.set({
		title: "Logs overview",
		description: "Logs overview analytics about logs.",
		breadcrumbs: [
			{ name: "Logs" },
			{ name: "Overview" }
		]
	});

	let statistics:(({ [key in LogLevel]: number } & { recentLogs: Log[], total: number }) | undefined) = $state();

	async function getStatistics() {
		const res = await fetch(`${API_URL}/getLogsOverviewStatistics`);
		if (!res.ok) {
			toast.error("Failed to fetch statistics");
			throw new Error("Failed to fetch statistics");
		}
		const data = await res.json();
		statistics = { ...data, total: data.warn + data.error + data.fatal + data.info + data.debug };
	}

	onMount(getStatistics);
</script>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
	<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Logs</Card.Title>
				<Logs class="text-muted-foreground size-4" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{statistics?.total ?? 0}</div>
				<!-- <p class="text-muted-foreground text-xs">	20 today</p> -->
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Warnings</Card.Title>
				<TriangleAlert class={cn("text-muted-foreground size-4", (statistics?.warn ?? 0) > 0 && 'text-amber-600')} />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{statistics?.warn ?? ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+180.1% from last month</p> -->
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Errors</Card.Title>
				<OctagonAlert class={cn("text-muted-foreground size-4", (statistics?.warn ?? 0) > 0 && 'text-red-600')} />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{statistics?.error ?? ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+19% from last month</p> -->
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Fatal errors</Card.Title>
				<Skull class={cn("text-muted-foreground size-4", (statistics?.warn ?? 0) > 0 && 'text-rose-600')} />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">{statistics?.fatal ?? ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+201 since last hour</p> -->
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
		<Card.Root class="xl:col-span-2">
			<Card.Header class="flex flex-row items-center">
				<div class="grid gap-2">
					<Card.Title>Logs</Card.Title>
					<Card.Description>Recent logs.</Card.Description>
				</div>
				<Button href="/app/logs" size="sm" class="ml-auto gap-1">
					View All
					<ArrowUpRight class="size-4" />
				</Button>
			</Card.Header>
			<Card.Content>
				<!-- Recent logs list -->
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Customer</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									liam@example.com
								</div>
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</Table.Cell>
							<Table.Cell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-23
							</Table.Cell>
							<Table.Cell class="text-right">$250.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Olivia Smith</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									olivia@example.com
								</div>
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</Table.Cell>
							<Table.Cell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-24
							</Table.Cell>
							<Table.Cell class="text-right">$150.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Noah Williams</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									noah@example.com
								</div>
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								Subscription
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</Table.Cell>
							<Table.Cell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-25
							</Table.Cell>
							<Table.Cell class="text-right">$350.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Emma Brown</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									emma@example.com
								</div>
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</Table.Cell>
							<Table.Cell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-26
							</Table.Cell>
							<Table.Cell class="text-right">$450.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									liam@example.com
								</div>
							</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
							<Table.Cell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</Table.Cell>
							<Table.Cell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-27
							</Table.Cell>
							<Table.Cell class="text-right">$550.00</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>
</div>
