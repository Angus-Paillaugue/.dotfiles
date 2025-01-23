<script>
  const { children } = $props();
</script>

<div class="table-container lenis-prevent">
  <table class="my-4 w-full table-auto border-collapse overflow-hidden rounded text-left text-sm">
    {@render children()}
  </table>
</div>
