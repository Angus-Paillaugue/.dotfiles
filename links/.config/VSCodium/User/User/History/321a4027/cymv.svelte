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
    ['info' as LogLevel, 'blue'],
    ['warning' as LogLevel, 'orange'],
    ['error' as LogLevel, 'red'],
    ['debug' as LogLevel, 'gray'],
  ]);
</script>
