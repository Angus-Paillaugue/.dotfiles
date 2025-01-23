<script>
  import { SEO, Card } from '$lib/components';
  import { getImageUrl, cn } from '$lib/utils';
	import { onMount } from 'svelte';

  let outfits = $state([])
  let items = $state([]);
  let currentPage = $derived(0);
  let isLoadingOutfits = $state(true);

  async function fetchOutfits(page) {
    isLoadingOutfits = true;
    setUrlParam('page', page);
    const res = await fetch(`/api/fetchOutfits?page=${page}`);

    if(!res.ok) {
      isLoadingOutfits = false;
      toast.error({ message:'Failed to fetch outfits' });
      return;
    }
    const data = await res.json();
    outfits = data;
    isLoadingOutfits = false;

    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  function setUrlParam(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  }

  // onMount(() => {
  //   const url = new URL(window.location.href);
  //   const page = Number(url.searchParams.get('page')) || 1;
  //   fetchOutfits(page);
  // });
</script>

<SEO title="Outfits" description="Your outfits" />

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
  {#if isLoadingOutfits}
    <!-- Display skeleton loader -->
    {#each {length:25} as _, i}
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
    {#each outfits.items as outfit}
      <Card href="/app/outfits/{outfit.id}">
        <h3>{outfit.name}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          {#each outfit.elements as item}
            <div class="flex flex-col">
              <img src={getImageUrl(item)} alt={item.name} class="size-full object-cover rounded-lg" />
              <p class="font-mono text-sm text-center text-neutral-400">{item.name}</p>
            </div>
          {/each}
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
