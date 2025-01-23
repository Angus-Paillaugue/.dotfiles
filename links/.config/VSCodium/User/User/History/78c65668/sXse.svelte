<script>
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import {
		RefreshCcw,
		CircleAlert,
		Cpu,
		MemoryStick,
		EthernetPort,
		Microchip
	} from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { io } from 'socket.io-client';

	const { speedtest: originalSpeedtestValues } = $props();

	const socket = io();
	let speedtest = $state(originalSpeedtestValues);
	let isRefreshingSpeedtestData = $state(false);
	let serverMetrics = $state({ cpu: undefined, memory: undefined });

	socket.on('metrics', ({ cpu, memory }) => {
		serverMetrics = { cpu, memory };
	});

	async function runSpeedtest() {
		isRefreshingSpeedtestData = true;
		const res = await fetch('/api/runSpeedtest', { method: 'POST' });
		if (res.ok) {
			const data = await res.json();
			speedtest = data;
			toast.success('Speedtest data fetched successfully');
		} else {
			toast.error('Error fetching speedtest data');
			console.error('Error fetching speedtest data');
		}
		isRefreshingSpeedtestData = false;
	}
</script>

<h2 class="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight mb-4">Metrics</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
	<!-- Internet speed -->
	<Card class="h-full">
		<CardHeader class="flex flex-row items-center justify-between">
			<div class="flex flex-row gap-4 items-center">
				<CardTitle>Internet speed</CardTitle>
				<Button
					variant="outline"
					class="p-1 h-fit"
					on:click={runSpeedtest}
					disabled={isRefreshingSpeedtestData}
				>
					<RefreshCcw class={cn('size-4', isRefreshingSpeedtestData && 'animate-spin')} />
				</Button>
			</div>
			<EthernetPort class="size-6 shrink-0 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="grid max-md:my-4 max-md:gap-6 grid-cols-1 md:grid-cols-3">
				<div class="flex flex-col items-center">
					<div class="text-2xl font-bold">{speedtest?.latest_download ?? 0} Mbps</div>
					<small>Download</small>
				</div>
				<div class="flex flex-col items-center">
					<div class="text-2xl font-bold">{speedtest?.latest_upload ?? 0} Mbps</div>
					<small>Upload</small>
				</div>
				<div class="flex flex-col items-center">
					<div class="text-2xl font-bold">{speedtest?.latest_ping ?? 0} Ms</div>
					<small>Ping</small>
				</div>
			</div>
			<Button href="/internetSpeedHistory" class="p-0 h-fit mt-4" variant="link"
				>View history</Button
			>
		</CardContent>
	</Card>

	<!-- Hardware metrics -->
	<Card>
		<CardHeader class="flex flex-row items-center justify-between">
			<CardTitle>Hardware metrics</CardTitle>
			<Microchip class="size-6 shrink-0 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div class="flex flex-col items-center space-y-4">
				<div class="w-full flex flex-row gap-4 items-center pb-4 border-b last:border-none">
					<Cpu class="size-6" />
					{#if !serverMetrics.cpu}
						<RefreshCcw class="size-4 animate-spin" />
					{:else}
						<h4 class="scroll-m-20 text-lg font-semibold tracking-tight">
							{Math.round(serverMetrics.cpu * 100)} %
						</h4>
					{/if}
				</div>
				<div class="w-full flex flex-row gap-4 items-center border-b last:border-none">
					<MemoryStick class="size-6" />
					{#if !serverMetrics.memory}
						<RefreshCcw class="size-4 animate-spin" />
					{:else}
						<div class="flex flex-row justify-between grow items-center">
							<h4 class="scroll-m-20 text-lg font-semibold tracking-tight">
								{Math.round((serverMetrics.memory.free / serverMetrics.memory.total) * 100)} %
							</h4>
							<small class="ml-auto">
								{(serverMetrics.memory.free / 1024).toFixed(2)} / {(
									serverMetrics.memory.total / 1024
								).toFixed(2)} Gb
							</small>
						</div>
					{/if}
				</div>
			</div>
		</CardContent>
	</Card>
</div>
