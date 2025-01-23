<script lang="ts">
  import { onMount } from 'svelte';
  import { type Log, type LogLevel } from '@shared/types';
  import { WEBSOCKET_URL } from '$lib/constants';
  import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card';
  import * as Table from '$lib/components/ui/table';
  import * as Select from '$lib/components/ui/select/index.js';
  import * as Drawer from '$lib/components/ui/drawer/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Checkbox } from '$lib/components/ui/checkbox/index.js';
  import { toast } from 'svelte-sonner';
  import { Trash2, Info, LoaderCircle } from 'lucide-svelte';
  import { pageMetadata } from '$lib/stores';
  import { formatTimestamp } from '$lib/utils';
  import LogLevelPill from '$lib/components/LogLevel.svelte';

  pageMetadata.set({
    title: 'Logs',
    description: 'View and manage logs.',
    breadcrumbs: [{ name: 'Logs' }, { name: 'All' }]
  });

  const logLevelValues = ['all', 'debug', 'info', 'warn', 'error', 'fatal'];

  let logs: Log[] = $state([]);
  let socket: WebSocket | undefined = $state();

  // Fetches logs based on the specified log level
  async function fetchLogs(
    { level }: { level?: LogLevel | 'all' } = { level: logLevelFilterValue }
  ) {
    if (!socket) return;

    socket.send(JSON.stringify({ action: 'fetchLogs', level, offset: logsOffset }));
  }

  // Connect to websocket and listen for new logs
  onMount(() => {
    socket = new WebSocket(WEBSOCKET_URL + '/logs');

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
        case 'newLogs': {
          response.logs.forEach((log: Log) => {
            logs = [log, ...logs];
          });
          break;
        }

        // Response handling when fetching logs
        case 'fetchLogs': {
          response.logs.forEach((log: Log) => {
            logs.push(log);
          });

          break;
        }

        default: {
          break;
        }
      }
    });

    // Fetching initial logs on connection
    socket.addEventListener('open', () => {
      fetchLogs();
    });
  });
</script>

<svelte:window oncontextmenu={onContextMenu} {onclick} />

<!-- Context menu -->
<div
  class="bg-background absolute z-20 flex w-[200px] flex-col overflow-hidden rounded border transition-opacity"
  bind:this={contextMenu}
  style="opacity: 0;"
>
  <button
    id="moreInfo"
    class="hover:bg-muted/50 flex w-full flex-row items-center gap-2 px-4 py-2 text-base transition-colors"
    ><Info class="size-4" />More info</button
  >
  <button
    id="deleteLog"
    class="hover:bg-muted/50 flex w-full flex-row items-center gap-2 px-4 py-2 text-base transition-colors"
  >
    <Trash2 class="size-4 text-red-600" />
    Delete
  </button>
</div>

<!-- Log detail modal -->
{#if drawerContent}
  <Drawer.Root bind:open={drawerOpen}>
    <Drawer.Content>
      <div class="mx-auto w-full max-w-screen-lg">
        <Drawer.Header>
          <Drawer.Title>Log</Drawer.Title>
        </Drawer.Header>
        <div class="p-4 pb-0">
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>
                  <LogLevelPill level={drawerContent.level} />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Timestamp</Table.Cell>
                <Table.Cell>{formatTimestamp(drawerContent.timestamp)}</Table.Cell>
              </Table.Row>
              {#if drawerContent.serverName}
                <Table.Row>
                  <Table.Cell>Server Name</Table.Cell>
                  <Table.Cell>{drawerContent.serverName}</Table.Cell>
                </Table.Row>
              {/if}
              <Table.Row>
                <Table.Cell>Source</Table.Cell>
                <Table.Cell>{drawerContent.source}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Message</Table.Cell>
                <Table.Cell>{drawerContent.message}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </div>
        <Drawer.Footer>
          <Drawer.Close class={buttonVariants({ variant: 'default' })}>Close</Drawer.Close>
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}

<!-- Main content -->
<div class="flex w-full flex-col">
  <div class="flex flex-col sm:gap-4 sm:py-4">
    <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card.Root>
        <Card.Header>
          <Card.Title>Logs</Card.Title>
        </Card.Header>
        <Card.Content>
          <!-- Loge level select & delete selected log rows -->
          <div class="mb-4 flex flex-row items-center justify-between gap-4">
            <div class="flex flex-row items-center gap-2">
              <Label for="logLevelFilter">Log level :</Label>
              <!-- Log level filter select -->
              <Select.Root
                type="single"
                name="logLevelFilter"
                bind:value={logLevelFilterValue}
                onValueChange={logLevelChange}
              >
                <Select.Trigger class="w-[180px]">
                  {logLevelFilterValue}
                </Select.Trigger>
                <Select.Content>
                  {#each logLevelValues as value}
                    <Select.Item {value}>{value}</Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
            {#if selectedRows.length > 0}
              <Button onclick={deleteLogs} variant="destructive" disabled={isDeletingLogs} loading={isDeletingLogs}
                >Delete {selectedRows.length} log{selectedRows.length > 1 ? 's' : ''}</Button
              >
            {/if}
          </div>

          <!-- Log list -->
          <Table.Root>
            <Table.Header>
              <Table.Row class="hover:bg-inherit">
                <Table.Head></Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>Timestamp</Table.Head>
                {#if logs.some((log) => log.serverName)}
                  <Table.Head>Server Name</Table.Head>
                {/if}
                <Table.Head>Message</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#if logs.length === 0 && !isLoadingLogs && !hasMoreLogs}
                <Table.Row class="hover:bg-inherit">
                  <Table.Cell colspan={5}>
                    <div
                      class="flex w-full flex-row justify-center text-center text-base font-medium"
                    >
                      No logs found!
                    </div>
                  </Table.Cell>
                </Table.Row>
              {/if}
              {#each logs as log (log.id)}
                <Table.Row class="log-row" data-log-id={log.id}>
                  <Table.Cell>
                    <div class="flex size-full flex-row items-center">
                      <Checkbox
                        class="log-row-checkbox"
                        name="logRow"
                        data-value={String(log.id)}
                        checked={selectedRows.includes(log.id)}
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <LogLevelPill level={log.level} />
                  </Table.Cell>
                  <Table.Cell class="font-medium">
                    {formatTimestamp(log.timestamp)}
                  </Table.Cell>
                  {#if logs.some((log) => log.serverName)}
                    <Table.Head>{log.serverName}</Table.Head>
                  {/if}
                  <Table.Cell>
                    {log.message}
                  </Table.Cell>
                </Table.Row>
              {/each}
              {#if isLoadingLogs && logs.length === 0}
                <Table.Row class="hover:bg-inherit">
                  <Table.Cell colspan={5}>
                    <div
                      class="flex w-full flex-row gap-2 justify-center text-center text-base font-medium"
                    >
                      <LoaderCircle class="animate-spin size-6" />
                      Loading
                    </div>
                  </Table.Cell>
                </Table.Row>
              {/if}
              {#if hasMoreLogs}
                <Table.Row class="hover:bg-inherit">
                  <Table.Cell colspan={5}>
                    <div class="flex w-full flex-row items-center justify-center">
                      <Button
                        loading={isLoadingLogs}
                        disabled={isLoadingLogs}
                        class="mx-auto"
                        onclick={() => fetchLogs()}>Load more</Button
                      >
                    </div>
                  </Table.Cell>
                </Table.Row>
              {/if}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer>
          <div class="text-muted-foreground text-xs">
            Showing <strong>{logs.length > 0 ? '1' : '0'}-{logs.length}</strong> of
            <strong>{totalLogs}</strong> log entries
          </div>
        </Card.Footer>
      </Card.Root>
    </main>
  </div>
</div>
