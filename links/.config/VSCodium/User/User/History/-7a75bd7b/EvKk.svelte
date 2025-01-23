<script>
  const { href, children } = $props();
</script>

<a {href} target={'_blank'} class="link">
  {@render children()}
</a>
