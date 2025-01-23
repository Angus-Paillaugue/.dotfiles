<script>
  const { children, ...restProps } = $props();
</script>

<div class="flex flex-col gap-0 collapsible-group">
  {@render children()}
</div>

<style>
  :global(.collapsible-group .collapsible) {
    @apply m-0
  }
</style>
