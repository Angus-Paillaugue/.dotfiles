<script lang="ts">
  import { type LogLevel } from '../app.d';

  interface Props {
    level: LogLevel;
	}

  const { level }: Props = $props();

  const formatLevel = (level: LogLevel) => {
    return level.toUpperCase();
  };

  const baseClasses = 'px-2 py-1 rounded-md text-sm font-semibold w-full text-center';
  const colors = new Map<LogLevel, string>([
    ['debug' as LogLevel, 'text-gray-600'],
    ['info' as LogLevel, 'text-blue-600'],
    ['warning' as LogLevel, 'text-amber-600'],
    ['error' as LogLevel, 'text-red-600'],
    ['fatal' as LogLevel, 'text-red-900'],
  ]);
</script>

<div class="{baseClasses} {colors.get(level)}">
  {formatLevel(level)}
</div>
