<script>
  import { Button } from '$lib/components';
  import { cn } from '$lib/utils';
  import { page } from '$app/stores';

  /** @type {import('./$types').LayoutData} */
  const { children } = $props();

  let isNested = $derived($page.url.pathname.slice(4).split('/').length > 2);
</script>

{#if !isNested}
  <div class="shrink-0 flex flex-row gap-4 mb-4">
    <Button variant="secondary" href="/app/items" class={cn($page.url.pathname.endsWith('items') && 'bg-neutral-700')}>Items</Button>
    <Button variant="secondary" href="/app/outfits" class={cn($page.url.pathname.endsWith('outfits') && 'bg-neutral-700')}>Outfits</Button>
  </div>
{/if}

<div class="flex flex-col grow">
  {@render children?.()}
</div>
