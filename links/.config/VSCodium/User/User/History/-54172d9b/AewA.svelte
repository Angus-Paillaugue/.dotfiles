<script lang="ts">
  import { type LogLevel } from '../../../../package/shared/types';

  const { level }: { level: LogLevel } = $props();

  const levelClasses = {
    debug: 'text-background dark:text-foreground bg-gray-600 dark:bg-gray-600',
    info: 'text-background dark:text-foreground bg-blue-600 dark:bg-blue-600',
    warn: 'text-background dark:text-foreground bg-amber-600 dark:bg-amber-600',
    error: 'text-background dark:text-foreground bg-red-600 dark:bg-red-600',
    fatal: 'text-background dark:text-foreground bg-rose-600 dark:bg-rose-600'
  };
</script>

<span class="rounded-full px-2 py-1 text-xs font-semibold uppercase {levelClasses[level]}">
  {level}
</span>
