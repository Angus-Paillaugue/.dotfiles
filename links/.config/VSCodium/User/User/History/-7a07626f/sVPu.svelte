<script lang="ts">
  import { type Log, type LogLevel } from '../app.d';

	interface Props {
    log: Log;
	}

	const { log }: Props = $props();

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const rowClasses = new Map<LogLevel, string>([
    ['info' as LogLevel, 'bg-blue-600/20'],
    ['warn' as LogLevel, 'bg-amber-600/20'],
    ['error' as LogLevel, 'bg-red-600/20'],
    ['fatal' as LogLevel, 'bg-rose-600/20'],
  ]);
</script>

<tr>
  <td class="text-neutral-600">
    {#if log.level !== 'debug'}
      Danger
    {/if}
    {formatTimestamp(log.timestamp)}
  </td>
  <td>
    {log.message}
  </td>
</tr>
