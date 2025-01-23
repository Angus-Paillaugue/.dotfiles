<script>
  const { children } = $props();
</script>

<div class="overflow-auto w-full lenis-prevent">
  <table class="my-4 w-full table-auto border-collapse overflow-hidden rounded text-left text-sm">
    {@render children()}
  </table>
</div>
