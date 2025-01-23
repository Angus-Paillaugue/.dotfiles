<script lang="ts">

</script>

<div
  class="flex flex-col items-center justify-between gap-1 rounded-xl border border-border bg-secondary"
>
  <div class="relative h-[400px] grow overflow-hidden">
    <div class="flex w-full grow flex-col justify-start gap-2 p-6">
      {#each logs.logs as l (l.id)}
        <div
          class="flex w-full flex-row gap-2 rounded-lg bg-background p-3"
          animate:flip={{ duration: 300 }}
          transition:fly={{ x: '100%', duration: 300, delay: 100 }}
        >
          <l.icon class="{l.color} mt-1 size-6" />
          <div class="flex flex-col">
            <span class="text-base font-medium">{l.title}</span>
            <span class="text-sm text-muted-foreground">{l.description}</span>
          </div>
        </div>
      {/each}
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-transparent to-secondary"
    ></div>
  </div>
  <div class="p-6 pt-0">
    <span class="text-base font-medium text-neutral-700 dark:text-neutral-300">
      <Timer class="inline size-[18px] align-middle" />
      Real-time logs.
    </span>
    <span class="text-base text-neutral-500">View logs in real-time as they are generated</span>
  </div>
</div>
