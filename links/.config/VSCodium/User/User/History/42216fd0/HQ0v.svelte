<script>
  const { children } = $props();
</script>

<div class="overflow-x lenis-prevent">
  <table class="my-4 w-full table-auto overflow-scroll border-collapse rounded text-left text-sm">
    {@render children()}
  </table>
</div>
