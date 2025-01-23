<script lang="ts">
  import { type LogLevel } from '../../app.d';
  import type { ComponentProps } from 'svelte';

  const { level }: { level: LogLevel } = $props();

  const levelClasses = {
    debug: 'text-gray-500 bg-gray-600',
    info: 'text-blue-500 bg-blue-600',
    warn: 'text-yellow-500 bg-yellow-600',
    error: 'text-red-500 bg-red-600',
    fatal: 'text- bg-red-600'
  };
</script>

<span
  class="rounded-full px-2 py-1 text-xs font-semibold uppercase {levelClasses[
    level
  ]}"
>
  {level}
</span>
