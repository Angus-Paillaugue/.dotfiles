<script lang="ts">
  import { type LogLevel } from '../app.d';

  interface Props {
    level: LogLevel;
	}

  const { level }: Props = $props();

  const formatLevel = (level: LogLevel) => {
    switch (level) {
      case 'DEBUG':
        return 'Debug';
      case 'INFO':
        return 'Info';
      case 'WARN':
        return 'Warning';
      case 'ERROR':
        return 'Error';
      default:
        return level;
    }
  };
</script>
