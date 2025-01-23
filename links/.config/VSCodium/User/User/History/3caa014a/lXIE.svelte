<script>
  const { children } = $props();
</script>

<li class="pl-8 relative mb-4">
  {@render children()}
</li>

<style lang="postcss">
  li::before {
    @apply absolute top-0 left-0 w-4 h-4 bg-primary-500 rounded-full;
  }
</style>
