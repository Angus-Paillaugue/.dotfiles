<script>
	import { onMount, onDestroy } from "svelte";
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "$lib/components/ui/select";
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
	import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Search } from "lucide-svelte";;
	import ApexCharts from "apexcharts";

	let logs = $state([
		{ id: 1, timestamp: "2023-11-20 10:30:15", level: "INFO", message: "Application started" },
		{ id: 2, timestamp: "2023-11-20 10:35:22", level: "WARNING", message: "High memory usage detected" },
		{ id: 3, timestamp: "2023-11-20 10:40:18", level: "ERROR", message: "Database connection failed" },
		{ id: 4, timestamp: "2023-11-20 10:45:30", level: "INFO", message: "User login successful" },
		{ id: 5, timestamp: "2023-11-20 10:50:45", level: "DEBUG", message: "Cache cleared" },
	]);

	let selectedLevel = $state("All");
	let searchQuery = $state("");

	let filteredLogs = $derived(logs.filter((log) => (selectedLevel === "All" || log.level === selectedLevel) && log.message.toLowerCase().includes(searchQuery.toLowerCase())));

	let chart;

	onMount(() => {
		const options = {
			chart: {
				type: "bar",
				height: 350,
			},
			series: [
				{
					name: "Log Count",
					data: [
						{ x: "INFO", y: logs.filter((log) => log.level === "INFO").length },
						{ x: "WARNING", y: logs.filter((log) => log.level === "WARNING").length },
						{ x: "ERROR", y: logs.filter((log) => log.level === "ERROR").length },
						{ x: "DEBUG", y: logs.filter((log) => log.level === "DEBUG").length },
					],
				},
			],
			xaxis: {
				type: "category",
			},
			colors: ["#3b82f6", "#eab308", "#ef4444", "#22c55e"],
		};

		chart = new ApexCharts(document.querySelector("#chart"), options);
		chart.render();
	});

	onDestroy(() => {
		if (chart) {
			chart.destroy();
		}
	});
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">Log Dashboard</h1>

	<Card class="mb-6">
		<CardHeader>
			<CardTitle>Log Level Distribution</CardTitle>
		</CardHeader>
		<CardContent>
			<div id="chart"></div>
		</CardContent>
	</Card>

	<div class="flex justify-between items-center mb-4">
		<div class="flex items-center space-x-2">
			<Select bind:value={selectedLevel}>
				<SelectTrigger class="w-[180px]">
					<SelectValue placeholder="Select log level" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">All Levels</SelectItem>
					<SelectItem value="INFO">Info</SelectItem>
					<SelectItem value="WARNING">Warning</SelectItem>
					<SelectItem value="ERROR">Error</SelectItem>
					<SelectItem value="DEBUG">Debug</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<div class="relative">
			<Search class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
			<Input type="text" placeholder="Search logs..." class="pl-8" bind:value={searchQuery} />
		</div>
	</div>

	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Timestamp</TableHead>
				<TableHead>Level</TableHead>
				<TableHead>Message</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each filteredLogs as log}
				<TableRow>
					<TableCell>{log.timestamp}</TableCell>
					<TableCell>
						<span class="px-2 py-1 rounded-full text-xs font-semibold" class:bg-blue-100={log.level === "INFO"} class:text-blue-800={log.level === "INFO"} class:bg-yellow-100={log.level === "WARNING"} class:text-yellow-800={log.level === "WARNING"} class:bg-red-100={log.level === "ERROR"} class:text-red-800={log.level === "ERROR"} class:bg-green-100={log.level === "DEBUG"} class:text-green-800={log.level === "DEBUG"}>
							{log.level}
						</span>
					</TableCell>
					<TableCell>{log.message}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
