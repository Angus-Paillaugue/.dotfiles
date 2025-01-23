<script lang="ts">
  const { href, children } = $props();
  import { ExternalLink } from 'lucide-svelte';

  let isPointingOutside = href.startsWith('http') || href.startsWith('mailto');
</script>

<a {href} target={isPointingOutside ? '_blank' : '_self'} class="text-base font-medium underline">
  {@render children()}
  {#if isPointingOutside}
    <ExternalLink class="size-4 inline" />
  {/if}
</a>
