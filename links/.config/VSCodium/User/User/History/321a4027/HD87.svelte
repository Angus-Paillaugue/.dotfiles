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
    ['info', 'blue'],
    ['warning', 'orange'],
    ['error', 'red'],
    ['debug', 'gray'],
  ]);
</script>
