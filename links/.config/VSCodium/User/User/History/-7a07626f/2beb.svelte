<script lang="ts">
  import { type Log, type LogLevel } from '../app.d';
  import { Info, TriangleAlert, OctagonAlert, Skull } from 'lucide-svelte';

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

<tr class="py-1 px-2 rounded {rowClasses.get(log.level)}">
  <td class="text-neutral-600 flex flex-row gap-2">
    <div class="w-8">
      {#if log.level === 'info'}
        <Info class="size-5 inline-block" />
      {:else if log.level === 'warn'}
        <TriangleAlert class="size-5 inline-block" />
      {:else if log.level === 'error'}
        <OctagonAlert class="size-5 inline-block" />
      {:else if log.level === 'fatal'}
        <Skull class="size-5 inline-block" />
      {/if}
    </div>
    {formatTimestamp(log.timestamp)}
  </td>
  <td>
    {log.message}
  </td>
</tr>
