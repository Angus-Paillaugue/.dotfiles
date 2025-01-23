<script>
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import * as Alert from "$lib/components/ui/alert";
	import {
		ArrowUpRight,
		ArrowDownRight,
		Wifi,
		HardDrive,
		Database,
		RefreshCcw,
		CircleAlert,
		Cpu,
		MemoryStick
	} from 'lucide-svelte';
	import Status from './Status.svelte';
	import { cn } from '$lib/utils';
	import { toast } from "svelte-sonner";
	import DatabaseInfo from './DatabaseInfo.svelte';
	import RTMetrics from './RTMetrics.svelte';
	import { io } from 'socket.io-client';

	const { data } = $props();

  const socket = io()
	const { services, disks, databases } = data;
	let speedtest = $state(data.speedtest);
	let isRefreshingSpeedtestData = $state(false);
	let databaseModalOpen = $state(false);
	let databaseModalDatabaseName = $state(null);
	let serverMetrics = $state({ cpu:undefined, memory: undefined });

	socket.on('metrics', ({ cpu, memory }) => {
    serverMetrics = { cpu, memory };
  })

	async function runSpeedtest() {
		isRefreshingSpeedtestData = true;
		const res = await fetch('/api/runSpeedtest', { method: 'POST' });
		if (res.ok) {
			const data = await res.json();
			speedtest = data;
			toast.success('Speedtest data fetched successfully');
		} else {
			console.error('Error fetching speedtest data');
			toast.error('Error fetching speedtest data');
		}
		isRefreshingSpeedtestData = false;
	}
</script>


<svelte:head>
  <title>
    Home server
  </title>
</svelte:head>


<RTMetrics />


<DatabaseInfo bind:open={databaseModalOpen} bind:databaseName={databaseModalDatabaseName} />

<div class="flex flex-row items-center justify-between w-full mb-4 mt-10">
	<h2 class="text-2xl font-semibold gap-4">Internet Speed</h2>
	<Button
		variant="outline"
		size="icon"
		on:click={runSpeedtest}
		disabled={isRefreshingSpeedtestData}
	>
		<RefreshCcw class={cn('size-4', isRefreshingSpeedtestData && 'animate-spin')} />
	</Button>
</div>
{#if !speedtest}
	<Alert.Root variant="destructive" class="mb-8">
		<CircleAlert class="h-4 w-4" />
		<Alert.Title class="m-0">Internet connection is out!</Alert.Title>
	</Alert.Root>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
		<!-- Download speed -->
		<a href="/internetSpeedHistory">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-2 pb-4">
					<CardTitle class="font-medium">Download Speed</CardTitle>
					<ArrowUpRight class="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{speedtest?.latest_download ?? 0} Mbps</div>
					<p class="text-xs text-muted-foreground">
						{speedtest.download_change_percentage >= 0
							? '+' + speedtest.download_change_percentage
							: speedtest.download_change_percentage}% from last time
					</p>
				</CardContent>
			</Card>
		</a>

		<!-- Upload speed -->
		<a href="/internetSpeedHistory">
			<Card class="relative group">
				<CardHeader class="flex flex-row items-center justify-between space-y-2 pb-4">
					<CardTitle class="font-medium">Upload Speed</CardTitle>
					<ArrowDownRight class="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{speedtest.latest_upload} Mbps</div>
					<div class="transition-all group-hover:inset-0 group-hover:bg-card group-hover:z-50">
						<p class="text-xs text-muted-foreground">
							{speedtest.upload_change_percentage >= 0
								? '+' + speedtest.upload_change_percentage
								: speedtest.upload_change_percentage}% from last time
						</p>
					</div>
				</CardContent>
			</Card>
		</a>

		<!-- Ping -->
		<a href="/internetSpeedHistory">
			<Card>
				<CardHeader class="flex flex-row items-center justify-between space-y-2 pb-4">
					<CardTitle class="font-medium">Ping</CardTitle>
					<Wifi class="size-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div class="text-2xl font-bold">{speedtest.latest_ping} ms</div>
					<p class="text-xs text-muted-foreground">
						{speedtest.ping_change >= 0 ? '+' + speedtest.ping_change : speedtest.ping_change} ms from
						last time
					</p>
				</CardContent>
			</Card>
		</a>
	</div>
{/if}

<h2 class="text-2xl font-semibold mb-4">Server statistics</h2>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
	<!-- Disks usage -->
	<Card>
		<CardHeader>
			<CardTitle>Disks usage</CardTitle>
		</CardHeader>
		<CardContent>
			{#if disks.length === 0}
				<Alert.Root variant="destructive">
					<Alert.Title class="m-0">Could not list disks mounted to the system!</Alert.Title>
				</Alert.Root>
			{:else}
				<div class="flex flex-col gap-6">
					{#each disks as disk}
						<div class="flex flex-col gap-4 w-full">
							<div class="flex flex-row gap-4 items-center">
								<HardDrive class="size-12" />
								<p class="text-lg font-semibold">{disk.size}</p>
								<p class="text-base w-2/6 ml-auto">{disk.mount}</p>
							</div>
							<Progress value={disk.usage.slice(0, -1)} max={100} class="w-full">
								{disk.used}
							</Progress>
						</div>
					{/each}
				</div>
			{/if}
		</CardContent>
	</Card>

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
				<div class="flex flex-col items-center">
					{#each databases.list as database}
						<button class="w-full flex flex-row gap-4 items-center p-4 border-b last:border-none transition-colors hover:bg-secondary rounded" data-name={database.name} onclick={(e) => {databaseModalDatabaseName = e.target.closest('button').dataset.name;databaseModalOpen = true}}>
							<Database class="size-6" />
							<p class="text-lg font-semibold">{database.name}</p>
							<p class="ml-auto">
								{database.size} Mb
							</p>
						</button>
					{/each}
				</div>
			{/if}
		</CardContent>
	</Card>

	<!-- Metrics -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between">
			<CardTitle>Metrics</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="flex flex-col items-center">
				<div class="w-full flex flex-row gap-4 items-center p-4 border-b last:border-none transition-colors hover:bg-secondary rounded">
					<Cpu class="size-6" />
					{#if !serverMetrics.cpu}
						<RefreshCcw class='size-4 animate-spin' />
					{:else}
						{Math.round(serverMetrics.cpu * 100)} %
					{/if}
				</div>
				<div class="w-full flex flex-row gap-4 items-center p-4 border-b last:border-none transition-colors hover:bg-secondary rounded">
					<MemoryStick class="size-6" />
					{#if !serverMetrics.memory}
						<RefreshCcw class='size-4 animate-spin' />
					{:else}
						<p class="font-bold">
							{Math.round((serverMetrics.memory.free / serverMetrics.memory.total) * 100)} %
						</p>
					{/if}
				</div>
			</div>
		</CardContent>
	</Card>
</div>

<h2 class="text-2xl font-semibold mb-4">Running Services</h2>
<!-- For each service within a category -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
	{#each services as card}
		<Card>
			<CardHeader>
				<div class="flex flex-row items-center gap-4">
					<img src={card.icon} alt="{card.name} icon" class="size-10 object-cover" />
					<h3 class="text-lg leading-none tracking-tight font-medium">{card.name}</h3>
					<Status isUp={card.isUp} class="ml-auto" />
				</div>
				<CardDescription>{card.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<div class="flex flex-row gap-4">
					<!-- If the card.url is an object where the key is the name (ec: Global, Local, ...) and the value is the url of the ressource -->
					{#if card.url instanceof Object}
						{#each Object.entries(card.url) as [name, url], linkIndex}
							<Button
								variant={linkIndex === 0 ? undefined : 'secondary'}
								href={url}
								aria-label="Open {name.toLowerCase()} url for the {card.name} interface"
								target="_blank"
								rel="noopener noreferrer">{name}</Button
							>
						{/each}
						<!-- Else, it means that car.url is a simple string of the url of the ressource -->
					{:else}
						<Button
							color="primary"
							href={card.url}
							target="_blank"
							aria-label="Open global url for the {card.name} interface"
							rel="noopener noreferrer">Global</Button
						>
					{/if}
				</div>
			</CardFooter>
		</Card>
	{/each}
</div>

<style>
	@keyframes -global-ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}
</style>
