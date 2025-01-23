<script>
  import Icon from '@iconify/svelte'
  const { href, children } = $props();

  let isPointingOutside = href.startsWith("http") || href.startsWith("mailto");
</script>

<a {href} target={isPointingOutside ? '_blank' : '_self'}>
  {@render children()}
  {#if isPointingOutside}
    <Icon
  {/if}
</a>
