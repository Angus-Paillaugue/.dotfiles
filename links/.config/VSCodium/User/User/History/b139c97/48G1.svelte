<script>
  const { children } = $props();
</script>

<div class="flex flex-col gap-4 pt-5 my-5 px-4 border-neutral-300/50 dark:border-neutral-700/50 border-t">
  <p class="mb-0"><span class="text-base font-bold dark:text-primary-100 text-primary-900">NOTE :</span> {@render children()}</p>
</div>
