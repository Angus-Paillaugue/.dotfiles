<script lang="ts">
  import { type LogLevel } from '../../app.d';
  import type { ComponentProps } from 'svelte';

  const { level }: { level: LogLevel } = $props();

  const levelClasses = {
    debug: 'text-foreground bg-gray-600',
    info: 'text-foreground bg-blue-600',
    warn: 'text-foreground bg-yellow-600',
    error: 'text-foreground bg-red-600',
    fatal: 'text-foreground bg-red-600'
  };
</script>

<span
  class="rounded-full px-2 py-1 text-xs font-semibold uppercase {levelClasses[
    level
  ]}"
>
  {level}
</span>
