<script>
  import { Card, CardContent, CardHeader , CardTitle} from '$lib/components/ui/card';
  import { HardDrive } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const { data } = $props();
  const { disks } = data;

  let selectedDiskIndex = $state(0);
</script>


<div class="grid grid-cols-3 gap-4 items-start">
  <!-- Disks usage -->
  <Card>
    <CardHeader>
      <CardTitle>Disks</CardTitle>
    </CardHeader>
    <CardContent class="p-6 flex flex-col gap-4">
      {#each disks as disk, index}
        <button
          class={cn(
            'w-full flex flex-row gap-4 items-center p-4 border-b last:border-none transition-colors hover:bg-secondary rounded',
            index === selectedDiskIndex && 'bg-secondary'
          )}
          onclick={() => {selectedDiskIndex = index}}
        >
          <HardDrive class="size-12" />
          <div class="flex flex-col items-start h-full justify-between">
            <p class="text-lg font-semibold">{disk.size}</p>
            <p class="text-sm text-muted-foreground">{disk.mountpoint}</p>
          </div>
        </button>
        {/each}
    </CardContent>
  </Card>
  <Card class="col-span-2">
    <CardHeader>
      <CardTitle>Disks metrics</CardTitle>
    </CardHeader>
    <CardContent class="p-6 flex flex-col gap-4">
      <table class="table-fixed border-collapse text-sm w-full">
        <thead>
          <tr>
            <th class="py-0.5 px-2">Property</th>
            <th class="py-0.5 px-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {#if disks[selectedDiskIndex]}
            {#each Object.entries(disks[selectedDiskIndex]) as [key, value]}
              <tr class="border-y [&:nth(even)]:bg-secondary">
                <td class="py-0.5 px-2">{key}</td>
                <td class="py-0.5 px-2">{value instanceof Date ? formatDate(value) : value}</td>
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan="2">No disk selected</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </CardContent>
  </Card>
</div>
