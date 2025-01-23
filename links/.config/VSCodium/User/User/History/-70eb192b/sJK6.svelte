<script>
  import { cn } from '$lib/utils';
  import * as Tooltip from "$lib/components/ui/tooltip";

  let { status = 'running', class: className } = $props();

  status = status?.toLocaleLowerCase();
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild let:builder>
    <div class={cn("relative size-3 shrink-0", className)}>
      <div
        class={cn(
          'rounded-full absolute inset-0',
          status === 'running' ? 'bg-green-400' : 'bg-red-500'
        )}
        style="animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"
      ></div>
      <div
        class={cn(
          'rounded-full absolute inset-0',
          status === 'running' ? 'bg-green-400' : 'bg-red-500'
        )}
      ></div>
    </div>
  </Tooltip.Trigger>
  <Tooltip.Content>
    test
  </Tooltip.Content>
</Tooltip.Root>
