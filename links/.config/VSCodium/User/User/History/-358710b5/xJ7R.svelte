<script>
  const { children, ...restProps } = $props();
</script>

<div class="flex flex-col gap-0">
  {@render children()}
</div>
