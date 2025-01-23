<script>
  import { Card, CardContent } from '$lib/components/ui/card';
  import { HardDrive } from 'lucide-svelte';

  const { data } = $props();
  const { disks } = data;

  console.log(disks);
  let selectedDiskIndex = $state(0);
</script>


<div class="grid grid-cols-3">
  <!-- Disks usage -->
  <Card>
    <CardContent class="p-6 flex flex-col gap-4">
      {#each disks as disk, index}
        <button class="flex flex-row gap-4 items-center" onclick={() => {selectedDiskIndex = index}}>
          <HardDrive class="size-12" />
          <div class="flex flex-col h-full justify-between">
            <p class="text-lg font-semibold">{disk.size}</p>
            <p class="text-sm text-muted-foreground">{disk.mountpoint}</p>
          </div>
        </button>
        {/each}
    </CardContent>
  </Card>
</div>
