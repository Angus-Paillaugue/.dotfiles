<script>

  const { children, class: className } = $props();

</script>

<button aria-label="Button" class="text-black {className}">
  {@render children()}
</button>
