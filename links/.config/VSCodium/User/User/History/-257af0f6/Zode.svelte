<script lang="ts">
  import { onMount } from 'svelte';
  import { type Log, type LogLevel } from '@shared/types';
  import { WEBSOCKET_URL } from '$lib/constants';
  import { toast } from 'svelte-sonner';
  import { pageMetadata } from '$lib/stores';

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
