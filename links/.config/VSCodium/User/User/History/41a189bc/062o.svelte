<script>
  import { SEO, Card } from '$lib/components';
  import { getImageUrl, cn } from '$lib/utils';
  import { toast } from '$lib/components/Toast';
	import { onMount } from 'svelte';
  import { pushState } from '$app/navigation'

  let items = $state([]);
  let currentPage = $derived(0);
  let isLoadingItems = $state(true);
  let skeletonNumberOfItems = 25;

  async function fetchItems(page) {
    isLoadingItems = true;
    setUrlParam('page', page);
    const res = await fetch(`/api/fetchItems?page=${page}`);

    if(!res.ok) {
      isLoadingItems = false;
      toast.error({ message:'Failed to fetch items' });
      return;
    }
    const data = await res.json();
    items = data;
    isLoadingItems = false;

    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  function setUrlParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    pushState({}, '', url);
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const page = Number(url.searchParams.get('page')) || 1;
    fetchItems(page);
  });
</script>

<SEO title="Items" description="Your items" />

<div class="grid grid-cols-2 md:grid-cols-3 grow gap-8">
  {#if isLoadingItems}
    <!-- Display skeleton loader -->
    {#each {length:skeletonNumberOfItems} as _, i}
      <Card class="items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0">
        <!-- Image -->
        <div class="animate-pulse bg-neutral-800 h-[200px] w-full"></div>
        <!-- Title -->
        <div class="p-4 w-full">
          <div class="animate-pulse bg-neutral-800 h-4 w-1/2 mx-auto rounded-xl"></div>
        </div>
      </Card>
    {/each}
  {:else}
    <!-- Display items -->
    {#each items.items as item}
      <Card href="/app/items/{item.id}" class="items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0">
        <img src={getImageUrl(item)} alt="" class="h-[200px] object-cover">
        <div class="p-4">
          <p class="font-mono text-base text-center">{item.name}</p>
        </div>
      </Card>
    {/each}
  {/if}
</div>

<!-- Pagination -->
<div class="shrink-0 flex flex-row items-center justify-center mx-auto gap-px rounded-xl overflow-hidden mt-4">
  {#each {length:items.totalPages} as _, i}
    {@const pageNo = i + 1}
    <button onclick={() => {fetchItems(pageNo)}} class={cn("flex items-center font-mono text-base font-semibold justify-center w-8 h-8 bg-card text-neutral-100", currentPage === pageNo && 'bg-neutral-700')}>{pageNo}</button>
  {/each}
</div>
