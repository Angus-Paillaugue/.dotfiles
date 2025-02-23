<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Progress } from '$lib/components/ui/progress/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
  import * as Tooltip from '$lib/components/ui/tooltip/index.js';
  import {
    Logs,
    ArrowUpRight,
    OctagonAlert,
    Skull,
    TriangleAlert,
    Cpu,
    MemoryStick,
    Database,
    ClockArrowUp,
    Info
  } from 'lucide-svelte';
  import LogLevel from '$lib/components/LogLevel.svelte';
  import { pageMetadata } from '$lib/stores';
  import { WEBSOCKET_URL } from '$lib/constants';
  import { type LogLevel as LogLevelType, type Log, type ServerStatistics } from '@shared/types';
  import { toast } from 'svelte-sonner';
  import { onMount } from 'svelte';
  import { cn, formatTimestamp, formatBytes } from '$lib/utils';

  pageMetadata.set({
    title: 'Logs overview',
    description: 'Logs overview analytics about logs.',
    breadcrumbs: [{ name: 'Logs' }, { name: 'Overview' }]
  });

  let socket: WebSocket | undefined = $state();
  let serverStatistics: ServerStatistics | undefined = $state();
  let logsOverviewStatistics:
    | ({ [key in LogLevelType]: number } & { recentLogs: Log[]; total: number })
    | undefined = $state();

  onMount(() => {
    socket = new WebSocket(WEBSOCKET_URL + '/getLogsOverviewStatistics');

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);

      if (!response.success) {
        toast.error('An error occurred while fetching logs');
        console.error(response.error);
        return;
      }

      switch (response.action) {
        // When the server is receiving new logs
        case 'initial': {
          logsOverviewStatistics = response.logsOverviewStatistics;
          if (!logsOverviewStatistics) return;
          logsOverviewStatistics.total =
            (logsOverviewStatistics?.debug ?? 0) +
            (logsOverviewStatistics?.info ?? 0) +
            (logsOverviewStatistics?.warn ?? 0) +
            (logsOverviewStatistics?.error ?? 0) +
            (logsOverviewStatistics?.fatal ?? 0);
          serverStatistics = response.serverStatistics;
          break;
        }

        // When receiving periodic server statistics updates
        case 'serverStatisticsUpdate': {
          serverStatistics = response.serverStatistics;
          break;
        }

        default: {
          break;
        }
      }
    });
  });

  const formatUptime = (secs: number): string => {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const d = Math.floor(secs / 86400);
    const h = Math.floor(secs / 3600);
    const m = Math.floor(secs / 60) - h * 60;
    const s = Math.floor(secs - h * 3600 - m * 60);
    let uptime = '';
    if (d > 0) uptime += `${d}d `;
    if (h > 0) uptime += `${pad(h)}h `;
    if (m > 0) uptime += `${pad(m)}m `;
    uptime += `${pad(s)}s`;
    return uptime;
  };
</script>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
  <div class="grid gap-4 md:gap-8 xl:grid-cols-3">
    <!-- Recent logs list -->
    <Card.Root class="xl:col-span-2">
      <Card.Header class="flex flex-row items-center">
        <div class="grid gap-2">
          <Card.Title>Logs</Card.Title>
          <Card.Description>Most recent logs.</Card.Description>
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
              <Table.Head>Status</Table.Head>
              <Table.Head>Timestamp</Table.Head>
              <Table.Head>Message</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#if logsOverviewStatistics}
              {#if logsOverviewStatistics.recentLogs.length === 0}
                <Table.Row class="hover:bg-inherit">
                  <Table.Cell colspan={3}>
                    <div
                      class="flex w-full flex-row items-center justify-center gap-2 text-center text-base font-medium"
                    >
                      <Info class="size-5 text-muted-foreground" />
                      No logs found!
                    </div>
                  </Table.Cell>
                </Table.Row>
              {:else}
                {#each logsOverviewStatistics.recentLogs as log}
                  <Table.Row>
                    <Table.Cell>
                      <LogLevel level={log.level} />
                    </Table.Cell>
                    <Table.Cell>{formatTimestamp(log.timestamp)}</Table.Cell>
                    <Table.Cell>{log.message}</Table.Cell>
                  </Table.Row>
                {/each}
              {/if}
            {:else}
              <!-- Show skeleton loader with 10 logs inside (max number of logs returned so no layout shift id database has more than 10 logs) -->
              {#each Array(10) as _}
                <Table.Row>
                  <Table.Cell>
                    <Skeleton class="h-[20px] w-[55px] rounded-full" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton class="h-[20px] w-[140px] rounded-full" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton class="h-[20px] w-full rounded-full" />
                  </Table.Cell>
                </Table.Row>
              {/each}
            {/if}
          </Table.Body>
        </Table.Root>
      </Card.Content>
    </Card.Root>

    <!-- Server statistics -->
    <Card.Root>
      <Card.Header>
        <div class="grid gap-2">
          <Card.Title>Server</Card.Title>
          <Card.Description>Get server statistics about health and performance.</Card.Description>
        </div>
      </Card.Header>
      <Card.Content class="flex flex-col gap-4">
        <!-- CPU Stats -->
        <div class="flex h-12 flex-row items-center gap-4">
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <Cpu class="size-8 text-muted-foreground" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>CPU Usage</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {#if serverStatistics}
            <div class="flex grow flex-col gap-2">
              <div class="text-sm font-semibold tracking-tight">
                {serverStatistics.cpuUsage.toFixed(1)}%
              </div>
              <Progress class="h-3" value={serverStatistics.cpuUsage} />
            </div>
          {:else}
            <!-- Show skeleton loader -->
            <div class="flex grow flex-col gap-3">
              <Skeleton class="h-[15px] w-[30px] rounded-full" />
              <Skeleton class="h-[12px] w-full rounded-full" />
            </div>
          {/if}
        </div>

        <!-- RAM Stats -->
        <div class="flex h-12 flex-row items-center gap-4">
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <MemoryStick class="size-8 text-muted-foreground" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>RAM Usage</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {#if serverStatistics}
            <div class="flex grow flex-col gap-2">
              <div class="flex flex-row items-center justify-between">
                <!-- Percentage -->
                <span class="text-sm font-semibold tracking-tight"
                  >{(100 - serverStatistics.memoryUsage.freeMemPercentage).toFixed(1)}%</span
                >
                <!-- Usage / Total -->
                <span class="text-xs text-muted-foreground"
                  >{formatBytes(serverStatistics.memoryUsage.usedMemMb * 1000000)} / {formatBytes(
                    serverStatistics.memoryUsage.totalMemMb * 1000000
                  )}</span
                >
              </div>
              <Progress class="h-3" value={100 - serverStatistics.memoryUsage.freeMemPercentage} />
            </div>
          {:else}
            <!-- Show skeleton loader -->
            <div class="flex grow flex-col gap-3">
              <div class="flex flex-row items-center justify-between">
                <Skeleton class="h-[15px] w-[30px] rounded-full" />
                <div class="flex flex-row items-center gap-1">
                  <Skeleton class="h-[15px] w-[50px] rounded-full" />
                  <Skeleton class="h-[15px] w-[50px] rounded-full" />
                </div>
              </div>
              <Skeleton class="h-[12px] w-full rounded-full" />
            </div>
          {/if}
        </div>

        <!-- Database size -->
        <div class="flex h-12 flex-row items-center gap-4">
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <Database class="size-8 text-muted-foreground" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Database Size</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {#if serverStatistics}
            <p class="font-mono font-medium text-foreground">
              {formatBytes(serverStatistics.databaseSize)}
            </p>
          {:else}
            <!-- Show skeleton loader -->
            <Skeleton class="h-[15px] w-[50px] rounded-full" />
          {/if}
        </div>

        <!-- Server uptime -->
        <div class="flex h-12 flex-row items-center gap-4">
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger>
                <ClockArrowUp class="size-8 text-muted-foreground" />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>Server Uptime</p>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          {#if serverStatistics}
            <p class="font-mono font-medium text-foreground">
              {formatUptime(serverStatistics.uptime)}
            </p>
          {:else}
            <!-- Show skeleton loader -->
            <Skeleton class="h-[15px] w-[100px] rounded-full" />
          {/if}
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</div>
