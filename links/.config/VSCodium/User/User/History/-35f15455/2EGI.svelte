<script>
  const { children, ...props } = $props();

  console.log(JSON.stringify(props, null, 2));
</script>

<h1 class="border-b border-main leading-[3rem] dark:border-main-dark" {id}>
  {@render children()}
</h1>
