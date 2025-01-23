<script>
  const { children } = $props();
</script>


<ol role="list" class="list-none steps">
  {@render children()}
</ol>

<style>
  :global(ol.steps) {
    counter-reset: steps-counter;
  }
</style>
