<script>
  import { Card, CardContent, CardHeader , CardTitle} from '$lib/components/ui/card';
  import { HardDrive } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const { data } = $props();
  const { disks } = data;

  console.log(disks);
  let selectedDiskIndex = $state(0);
</script>


<div class="grid grid-cols-3">
  <!-- Disks usage -->
  <Card>
    <CardHeader>
      <CardTitle>Disks</CardTitle>
    </CardHeader>
    <CardContent class="p-6 flex flex-col gap-4">
      {#each disks as disk, index}
        <button
          class={cn(
            'w-full flex flex-row gap-4 p-4 border-b last:border-none transition-colors hover:bg-secondary rounded',
            index === selectedDiskIndex && 'bg-secondary'
          )}
          onclick={() => {selectedDiskIndex = index}}
        >
          <HardDrive class="size-12" />
          <div class="flex flex-col it h-full justify-between">
            <p class="text-lg font-semibold">{disk.size}</p>
            <p class="text-sm text-muted-foreground">{disk.mountpoint}</p>
          </div>
        </button>
        {/each}
    </CardContent>
  </Card>
</div>
