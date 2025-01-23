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
    ['info' as LogLevel, 'bg-blue-600120 text-blue-600'],
    ['warn' as LogLevel, 'bg-amber-600/10 text-amber-600'],
    ['error' as LogLevel, 'bg-red-600/10 text-red-600'],
    ['fatal' as LogLevel, 'bg-rose-600/10 text-rose-600'],
  ]);
</script>

<div class="p-1">
  <div class="rounded flex flex-row {rowClasses.get(log.level)}">
    <div class="flex flex-row gap-2 w-[200px]">
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
    </div>
    <div>
      {log.message}
    </div>
  </div>
</div>
