<script lang="ts">
  import { type LogLevel } from '../app.d';

  interface Props {
    level: LogLevel;
	}

  const { level }: Props = $props();

  const formatLevel = (level: LogLevel) => {
    return level.toUpperCase();
  };

  const colors = new Map<LogLevel, string>([
    ['debug' as LogLevel, 'bg-gray-600 text-neutral-100'],
    ['info' as LogLevel, 'bg-blue-600 text-neutral-100'],
    ['warning' as LogLevel, 'bg-amber-600 text-neutral-100'],
    ['error' as LogLevel, 'bg-red-600 text-neutral-100'],
    ['fatal' as LogLevel, 'bg-red-900 text-neutral-100'],
  ]);
</script>

<div class="{colors.get(level)}">
  {formatLevel(level)}
</div>
