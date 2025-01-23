<script>
  import { SEO, Card } from '$lib/components';
  import { getImageUrl, cn } from '$lib/utils';
  import { toast } from '$lib/components/Toast';
	import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let items = $state([]);
  let currentPage = $state();
  let isLoadingItems = $state(true);
  let skeletonNumberOfItems = 25;
  let selectedItems = $state(new Set());

  async function fetchItems(page) {
    isLoadingItems = true;
    if(page !== currentPage) {
      currentPage = page;
      setUrlParam('page', page);
    }

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
    $page.url.searchParams.set(key, value);
    goto(`?${$page.url.searchParams.toString()}`);
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const page = Number(url.searchParams.get('page')) || 1;
    fetchItems(page);
  });

  function toggleItem(id) {
    if(selectedItems.has(id)) {
      selectedItems.delete(id);
    } else {
      selectedItems.add(id);
    }
  }
</script>

<SEO title="Create an outfit" description="Create an outfit" />

<div class="grid grid-cols-2 md:grid-cols-3 grow gap-4">
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
      {@const isSelected = selectedItems.has(item.id)}
      <Card onclick={() => {toggleItem(item.id)}} class={cn("items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0", isSelected && 'ring-4 ring-neutral-600/50')}>
        <img src={getImageUrl(item)} alt="" class="h-[200px] object-cover rounded-lg">
        <div class="p-4">
          <p class="font-mono text-base text-center">{item.name}</p>
        </div>
      </Card>
    {/each}
  {/if}
</div>

<!-- Pagination -->
{#if items?.totalPages > 1}
  <div class="shrink-0 flex flex-row items-center justify-center mx-auto gap-px rounded-xl overflow-hidden mt-4">
    {#each {length:items.totalPages} as _, i}
      {@const pageNo = i + 1}
      <button onclick={() => {fetchItems(pageNo)}} class={cn("flex items-center font-mono text-base font-semibold justify-center w-8 h-8 bg-card text-neutral-100", currentPage === pageNo && 'bg-neutral-700')}>{pageNo}</button>
    {/each}
  </div>
{/if}
