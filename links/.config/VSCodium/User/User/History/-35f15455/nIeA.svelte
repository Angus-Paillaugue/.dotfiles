<script>
  const { children, } = $props();
</script>

<h1 class="border-b border-main leading-[3rem] dark:border-main-dark" {id}>
  {@render children()}
</h1>
