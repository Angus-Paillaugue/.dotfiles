<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "$lib/components/ui/card"
	import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "$lib/components/ui/table"
	import { Logs, ArrowUpRight, OctagonAlert, Skull, TriangleAlert } from "lucide-svelte";
	import { pageMetadata } from "$lib/stores";
	import { API_URL } from "$lib/constants";
	import { type LogLevel } from "../../app.d";
	import { toast } from "svelte-sonner";
    import { onMount } from "svelte";

	pageMetadata.set({
		title: "Logs overview",
		description: "Logs overview analytics about logs.",
		breadcrumbs: [
			{ name: "Logs" },
			{ name: "Overview" }
		]
	});

	let statistics:({ [key in LogLevel]: number } | undefined) = $state();

	async function getStatistics() {
		const res = await fetch(`${API_URL}/getLogsOverviewStatistics`);
		if (!res.ok) {
			toast.error("Failed to fetch statistics");
			throw new Error("Failed to fetch statistics");
		}
		const data = await res.json();
		statistics = data;
	}

	onMount(getStatistics);

	$inspect(statistics)
</script>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
	<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Total Logs</CardTitle>
				<Logs class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{statistics ? Object.values(statistics).reduce((acc, val) => acc + val) : 0}</div>
				<!-- <p class="text-muted-foreground text-xs">	20 today</p> -->
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Warnings</CardTitle>
				<TriangleAlert class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{statistics ? statistics.warn : ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+180.1% from last month</p> -->
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Errors</CardTitle>
				<OctagonAlert class="text-muted-foreground h-4 w-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{statistics ? statistics.error : ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+19% from last month</p> -->
			</CardContent>
		</Card>
		<Card>
			<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle class="text-sm font-medium">Fatal errors</CardTitle>
				<Skull class="text-muted-foreground size-4" />
			</CardHeader>
			<CardContent>
				<div class="text-2xl font-bold">{statistics ? statistics.fatal : ''}</div>
				<!-- <p class="text-muted-foreground text-xs">+201 since last hour</p> -->
			</CardContent>
		</Card>
	</div>
	<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
		<Card class="xl:col-span-2">
			<CardHeader class="flex flex-row items-center">
				<div class="grid gap-2">
					<CardTitle>Logs</CardTitle>
					<CardDescription>Recent logs.</CardDescription>
				</div>
				<Button href="/app/logs" size="sm" class="ml-auto gap-1">
					View All
					<ArrowUpRight class="size-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead class="xl:table.-column hidden">Type</TableHead>
							<TableHead class="xl:table.-column hidden">Status</TableHead>
							<TableHead class="xl:table.-column hidden">Date</TableHead>
							<TableHead class="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									liam@example.com
								</div>
							</TableCell>
							<TableCell class="xl:table.-column hidden">Sale</TableCell>
							<TableCell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</TableCell>
							<TableCell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-23
							</TableCell>
							<TableCell class="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div class="font-medium">Olivia Smith</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									olivia@example.com
								</div>
							</TableCell>
							<TableCell class="xl:table.-column hidden">Refund</TableCell>
							<TableCell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Declined</Badge>
							</TableCell>
							<TableCell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-24
							</TableCell>
							<TableCell class="text-right">$150.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div class="font-medium">Noah Williams</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									noah@example.com
								</div>
							</TableCell>
							<TableCell class="xl:table.-column hidden">
								Subscription
							</TableCell>
							<TableCell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</TableCell>
							<TableCell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-25
							</TableCell>
							<TableCell class="text-right">$350.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div class="font-medium">Emma Brown</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									emma@example.com
								</div>
							</TableCell>
							<TableCell class="xl:table.-column hidden">Sale</TableCell>
							<TableCell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</TableCell>
							<TableCell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-26
							</TableCell>
							<TableCell class="text-right">$450.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<div class="font-medium">Liam Johnson</div>
								<div class="text-muted-foreground hidden text-sm md:inline">
									liam@example.com
								</div>
							</TableCell>
							<TableCell class="xl:table.-column hidden">Sale</TableCell>
							<TableCell class="xl:table.-column hidden">
								<Badge class="text-xs" variant="outline">Approved</Badge>
							</TableCell>
							<TableCell
								class="md:table.-cell xl:table.-column hidden lg:hidden"
							>
								2023-06-27
							</TableCell>
							<TableCell class="text-right">$550.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	</div>
</div>
