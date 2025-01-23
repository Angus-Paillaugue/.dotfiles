<script>
  import { SEO, Card } from '$lib/components';
  import { getImageUrl, cn } from '$lib/utils';
	import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let outfits = $state([]);
  let selectedItems = $state([]);
  let currentPage = $state();
  let isLoadingOutfits = $state(true);

  async function fetchOutfits(page) {
    isLoadingOutfits = true;
    if(page != currentPage) {
      currentPage = page;
      setUrlParam('page', page);
    }

    const res = await fetch(`/api/fetchOutfits?page=${page}`);
    if(!res.ok) {
      isLoadingOutfits = false;
      toast.error({ message:'Failed to fetch outfits' });
      return;
    }
    const data = await res.json();
    outfits = data;
    isLoadingOutfits = false;
  }

  function setUrlParam(key, value) {
    $page.url.searchParams.set(key, value);
    goto(`?${$page.url.searchParams.toString()}`);
  }

  onMount(() => {
    const url = new URL(window.location.href);
    const page = Number(url.searchParams.get('page')) || 1;
    fetchOutfits(page);
  });

  function randomIntFromInterval(min = 2, max = 4) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
</script>

<SEO title="Outfits" description="Your outfits" />

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  {#if isLoadingOutfits}
    <!-- Display skeleton loader -->
    <!-- Display items -->
    {#each items.items as item}
      {@const isSelected = selectedItems.includes(item.id)}
      <Card onclick={() => {toggleItem(item.id)}} class={cn("items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0", isSelected && 'ring-4 ring-neutral-400/50')}>
        <img src={getImageUrl(item)} alt={item.name} class="h-[200px] object-cover rounded-lg">
        <div class="p-4">
          <p class="font-mono text-base text-center">{item.name}</p>
        </div>
      </Card>
    {/each}
  {:else}
    {#each outfits.items as outfit}
      <Card href="/app/outfits/{outfit.id}">
        <h3 class="text-center">{outfit.name}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          {#each outfit.elements as item}
            <div class="flex flex-col">
              <img src={getImageUrl(item)} alt="" class="h-[200px] object-cover rounded-lg" />
              <p class="font-mono text-sm text-center text-neutral-400">{item.name}</p>
            </div>
          {/each}
        </div>
      </Card>
    {/each}
  {/if}
</div>

<!-- Pagination -->
{#if outfits?.totalPages > 1}
  <div class="shrink-0 flex flex-row items-center justify-center mx-auto gap-px rounded-xl overflow-hidden mt-4">
    {#each {length:items.totalPages} as _, i}
      {@const pageNo = i + 1}
      <button onclick={() => {fetchItems(pageNo)}} class={cn("flex items-center font-mono text-base font-semibold justify-center w-8 h-8 bg-card text-neutral-100", currentPage === pageNo && 'bg-neutral-700')}>{pageNo}</button>
    {/each}
  </div>
{/if}
