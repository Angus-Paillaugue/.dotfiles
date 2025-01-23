<script>
  let count = $state(0);
</script>

<section class="flex flex-row gap-4 items-center">
  <button onclick={() => (count = Math.max(0, count - 1))} class="rounded-md bg-primary-300 dark:bg-primary-700 p-2 transition-all active:scale-90">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  </button>

  <span class="text-xl font-bold">
    {count}
  </span>

  <button onclick={() => (count ++)} class="rounded-md bg-primary-300 dark:bg-primary-700 p-2 transition-all active:scale-90">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</section>
