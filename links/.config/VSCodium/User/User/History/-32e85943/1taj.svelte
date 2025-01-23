<script lang="ts">
  import { type LogLevel } from '../../app.d';
  import type { ComponentProps } from 'svelte';

  const { level }: { level: LogLevel } = $props();

  const levelClasses = {
    debug: 'text-gray-500',
    info: 'text-blue-500',
    warn: 'text-yellow-500',
    error: 'text-red-500',
    fatal: 'text-red-700'
  };
</script>

<span
  class="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold uppercase text-gray-800 {levelClasses[
    level
  ]}"
>
  {level}
</span>
