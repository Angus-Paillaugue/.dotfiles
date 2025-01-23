<script>

  const { children, class: className } = $props();

</script>

<div class={cn("bg-card border border-border rounded-lg p-4", className)}>
  {@render children?.()}
</div>
