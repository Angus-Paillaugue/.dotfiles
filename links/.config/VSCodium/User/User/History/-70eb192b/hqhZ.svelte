<script>
  import { cn } from '$lib/utils';

  const { status = 'running', class: className } = $props();
</script>

<div class={cn("relative size-3 shrink-0", className)}>
  <div
    class={cn(
      'rounded-full absolute inset-0',
      status === 'Running' ? 'bg-green-400' : 'bg-red-500'
    )}
    style="animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"
  ></div>
  <div
    class={cn(
      'rounded-full absolute inset-0',
      status === 'Running' ? 'bg-green-400' : 'bg-red-500'
    )}
  ></div>
</div>
