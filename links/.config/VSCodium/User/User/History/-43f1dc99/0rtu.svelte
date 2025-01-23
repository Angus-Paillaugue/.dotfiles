<script lang="ts">
  import { onMount } from 'svelte';
  import { type Log, type LogLevel } from '../app.d';
  import LogRow from './LogRow.svelte';
  import { Trash2 } from 'lucide-svelte';
  import { WEBSOCKET_URL, API_URL } from '$lib/constants';
	import { flip } from 'svelte/animate';

  const tableColumnWidths: [string, string] = ["300px", "100%"];
  const logLevelValues = ['all', 'debug', 'info', 'warn', 'error', 'fatal'];

  let logs: Log[] = $state([]);
  let logIds: Set<number> = $state(new Set());
  let isLoading: boolean = $state(false);
  let isFetchingMoreLogs: boolean = $state(false);
  let socket: WebSocket|undefined = $state();
  let logsOffset: number = $state(0);
  let hasMoreLogs: boolean = $state(true);
  let totalLogs: number = $state(0);
  let logLevelFilterValue: LogLevel | 'all' = $state('all');
  let contextMenu: HTMLElement | undefined = $state();
  let deleteRowsButtonVisible: boolean = $state(false);

  // Fetches logs based on the specified log level
  async function fetchLogs({ level }: { level?: LogLevel | 'all' } = { level: logLevelFilterValue }) {
    if(isLoading || !hasMoreLogs) return;

    if(logs.length === 0) {
      isLoading = true;
    }else {
      isFetchingMoreLogs = true;
    }


    // Fetch logs from API
    const res = await fetch(API_URL+'/logs?offset='+logsOffset+'&level='+level);
    const newLogs = await res.json();

    // Update state
    logsOffset = newLogs.offset;
    hasMoreLogs = newLogs.hasMore;
    totalLogs = newLogs.total;
    newLogs.logs.forEach((log: Log) => {
      if(logIds.has(log.id)) return;
      logs.push(log);
      logIds.add(log.id);
    });

    isLoading = false;
    isFetchingMoreLogs = false;
  }

  // Connect to websocket and listen for new logs
  onMount(() => {
    socket = new WebSocket(WEBSOCKET_URL+'/logs');

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const newLogs = JSON.parse(event.data);


      filterLogs(newLogs).forEach((log: Log) => {
        if(logIds.has(log.id)) return;
        logs = [log, ...logs];
        logIds.add(log.id);
        totalLogs++;
      });
      isLoading = false;
    });

    fetchLogs();
  });

  // Function to handle log level change
  function logLevelChange() {
    logs = [];
    logIds = new Set();
    logsOffset = 0;
    hasMoreLogs = true;
    totalLogs = 0;
    fetchLogs({ level: logLevelFilterValue });
  }

  function filterLogs(logs: Log[]): Log[] {
    return logs.filter(log => logLevelFilterValue === 'all' || log.level === logLevelFilterValue);
  }

  async function deleteLog(logId: number) {
    const req = await fetch(API_URL+'/logs/'+logId, { method: 'DELETE' });
    if(req.status !== 200) return;
    logs = logs.filter(log => log.id !== logId);
    logIds.delete(logId);
  }

  async function deleteLogs() {
    try {
      const logsToDelete = Array.from(document.querySelectorAll('.log-row-checkbox')).filter(checkbox => (checkbox as HTMLInputElement).checked).map(checkbox => parseInt((checkbox as HTMLInputElement).value));

      const req = await fetch(API_URL+'/logs', { method: 'DELETE', body: JSON.stringify({ logIds:logsToDelete }), headers: { 'Content-Type': 'application/json' } });
      if(req.status !== 200) return;
      logs = logs.filter(log => !logsToDelete.includes(log.id));
      logIds = new Set([...logsToDelete]);
    } catch(e) {
      console.error(e);
    }
  }

  function onContextMenu(e: MouseEvent) {
    if(!e?.target || !(e.target as HTMLElement).closest('.log-row') || !contextMenu) return;
    e.preventDefault();
    const { clientX, clientY } = e;
    contextMenu.style.left = `${clientX}px`;
    contextMenu.style.top = `${clientY}px`;
    contextMenu.style.opacity = '1';
    const logId = (e.target as HTMLElement).closest('.log-row')?.getAttribute('data-log-id');
    if(logId) {
      contextMenu.querySelector('button#deleteLog')?.addEventListener('click', () => deleteLog(parseInt(logId)));
    }
  }

  function onclick(e: MouseEvent) {
    if(contextMenu) {
      contextMenu.style.opacity = '0';
    }

    // Handle shift click to select multiple checkboxes
    if(e.target && (e.target as HTMLElement).closest('.log-row-checkbox')) {
      const checkboxes = document.querySelectorAll('.log-row-checkbox');

      if(e.shiftKey) {
        const start = Array.from(checkboxes).findIndex(checkbox => (checkbox as HTMLInputElement).checked);
        const end = Array.from(checkboxes).findIndex(checkbox => checkbox === e.target);
        Array.from(checkboxes).slice(Math.min(start, end), Math.max(start, end)).forEach(checkbox => (checkbox as HTMLInputElement).checked = true);
      }

      const checked = Array.from(checkboxes).filter(checkbox => (checkbox as HTMLInputElement).checked);
      deleteRowsButtonVisible = checked.length > 0;
    }
  }
</script>

<svelte:window oncontextmenu={onContextMenu} onclick={onclick} />

<div class="flex flex-row items-start justify-between">
  <select name="logLevel" id="logLevel" bind:value={logLevelFilterValue} onchange={logLevelChange}>
    {#each logLevelValues as value}
      <option value={value}>{value.toUpperCase()}</option>
    {/each}
  </select>
  {#if deleteRowsButtonVisible}
    <button class="btn" onclick={deleteLogs}>Delete selected rows</button>
  {/if}
</div>

<!-- Context menu -->
<div class="absolute transition-opacity z-20 flex flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950" bind:this={contextMenu} style="opacity: 0;">
  <button id="deleteLog" class="w-full py-1 px-4 transition-colors hover:bg-neutral-800/50 flex flex-row items-center gap-2">
    <Trash2 class="size-4 text-red-600" />
    Delete
  </button>
</div>

<!-- Table -->
<div class="w-full flex flex-col gap-1 p-4">
  <!-- Table header -->
  <div class="flex flex-row">
    <div class="shrink-0" style="width: {tableColumnWidths[0]};">Timestamp</div>
    <div class="shrink-0" style="width: {tableColumnWidths[1]};">Message</div>
  </div>

  <!-- Table rows -->
  {#if isLoading}
    <div class="w-full text-center">
      Loading...
    </div>
  {/if}
  {#if logs.length === 0 && !isLoading}
    <div class="w-full text-center">
      No logs found
    </div>
  {:else}
    {#if totalLogs > 0}
      <div class="w-full text-center">
        Showing {logs.length} of {totalLogs} logs
      </div>
    {/if}
    {#each logs as log (log.id)}
      <div animate:flip>
        <LogRow {log} {tableColumnWidths} class="bg-neutral-950/20 transition-colors" />
      </div>
    {/each}
    {#if isFetchingMoreLogs}
      <div class="w-full text-center">
        Loading more logs...
      </div>
    {/if}
    {#if hasMoreLogs}
      <div class="w-full text-center">
        <button disabled={isFetchingMoreLogs} class="btn" onclick={() => fetchLogs()}>Load more</button>
      </div>
    {:else}
      <div class="w-full text-center">
        No more logs to load
      </div>
    {/if}
  {/if}
</div>
