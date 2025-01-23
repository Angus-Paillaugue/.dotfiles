<script>
  const { children } = $props();
</script>
<div class="flex flex-col gap-4 mt-6 p-4">
  <p class="mb-0 note"><span class="text-base dark:text-primary-100 text-primary-900">NOTE :</span> {@render children()}</p>
</div>

<style>

</style>
