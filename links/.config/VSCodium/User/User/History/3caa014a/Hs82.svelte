<script>
  const { children } = $props();
</script>

<li class="pl-8">
  {@render children()}
</li>

<style lang="postcss">
  li {
    @apply 
  }
</style>
