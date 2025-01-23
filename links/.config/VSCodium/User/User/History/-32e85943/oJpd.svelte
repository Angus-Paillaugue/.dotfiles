<script lang="ts">
  import { type LogLevel } from '../../app.d';

  const { level }: { level: LogLevel } = $props();

  const levelClasses = {
    debug: 'text-foreground bg-gray-600 dark:bg-gray-800',
    info: 'text-foreground bg-blue-600 dark:bg-blue-800',
    warn: 'text-foreground bg-amber-600 dark:bg-amber-800',
    error: 'text-foreground bg-red-600 dark:bg-red-800',
    fatal: 'text-foreground bg-red-600 dark:bg-red-800'
  };
</script>

<span
  class="rounded-full px-2 py-1 text-xs font-semibold uppercase {levelClasses[
    level
  ]}"
>
  {level}
</span>
