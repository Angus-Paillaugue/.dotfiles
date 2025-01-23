<script lang="ts">
  import { onMount } from 'svelte';
  import { type Log, type LogLevel } from '@shared/types';
  import { WEBSOCKET_URL } from '$lib/constants';
  import { toast } from 'svelte-sonner';
  import { pageMetadata } from '$lib/stores';
  import DataTable from "./data-table.svelte";
	import data from "./tasks.json";


  pageMetadata.set({
    title: 'Logs',
    description: 'View and manage logs.',
    breadcrumbs: [{ name: 'Logs' }, { name: 'All' }]
  });

  let logs: Log[] = $state([]);
  let socket: WebSocket | undefined = $state();

  // Fetches logs based on the specified log level
  async function fetchLogs(
    { level }: { level?: LogLevel | 'all' } = { level: 'all' }
  ) {
    if (!socket) return;

    socket.send(JSON.stringify({ action: 'fetchLogs', level }));
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

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	<DataTable {data} />
</div>
