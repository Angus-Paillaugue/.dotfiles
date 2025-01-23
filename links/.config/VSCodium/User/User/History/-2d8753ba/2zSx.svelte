<script>
  import { SEO, Card , Button} from '$lib/components';
  import { Pencil } from 'lucide-svelte';
  import { getImageUrl, cn } from '$lib/utils';
	import { onMount } from 'svelte';
  import { toast } from '$lib/components/Toast';
  import { fade, fly } from 'svelte/transition';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
  const { id } = data;
  let outfit = $state();
  let editOutfitModalVisible = $state(true);
  let items = $state({});
  let currentPage = $state(1);
  let isLoadingItems = $state(true);
  let selectedItems = $state([]);

  async function getOutfit() {
    const res = await fetch(`/api/fetchOutfit?id=${id}`);
    if(!res.ok) {
      toast.error({ message:'Failed to fetch outfit' });
      return;
    }
    const data = await res.json();
    outfit = data;
    selectedItems = outfit.elements.map((item) => item.id);
  }

  onMount(() => {
    getOutfit();
  });

  function toggleItem(id) {
    if(selectedItems.length === 1) return;

    if(selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((item) => item !== id);
    } else {
      selectedItems.push(id);
    }
  }

  async function fetchItems(page) {
    isLoadingItems = true;
    if(page !== currentPage) {
      currentPage = page;
    }

    const res = await fetch(`/api/fetchItems?page=${currentPage}`);

    if(!res.ok) {
      isLoadingItems = false;
      toast.error({ message:'Failed to fetch items' });
      return;
    }
    const data = await res.json();
    items = data;
    isLoadingItems = false;
  }

  $effect(() => {
    if(!editOutfitModalVisible || items?.items) return;
    fetchItems(1);
  });

  $inspect(selectedItems)
</script>

<SEO title="Outfit" description="My outfits" />

{#if editOutfitModalVisible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed bg-neutral-950/50 backdrop-blur-sm inset-0 z-30" transition:fade onclick={() => (editOutfitModalVisible = false)}></div>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md w-full z-40" transition:fly={{ y:'100%' }}>
    <Card>
      <h3>Edit outfit</h3>
      <!-- Display items -->
        <div class="grid p-1 grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
          {#each items.items as item}
            {@const isSelected = selectedItems.includes(item.id)}
            <Card onclick={() => {toggleItem(item.id)}} class={cn("items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0", isSelected && 'ring-4 ring-neutral-400/50')}>
              <img src={getImageUrl(item)} alt="" class="h-[200px] object-cover rounded-lg">
              <div class="p-4">
                <p class="font-mono text-base text-center">{item.name}</p>
              </div>
            </Card>
          {/each}
        </div>
      <!-- Pagination -->
      {#if items?.totalPages > 1}
        <div class="shrink-0 border border-border flex flex-row items-center justify-center mx-auto w-fit gap-px rounded-xl overflow-hidden mt-4">
          {#each {length:items.totalPages} as _, i}
            {@const pageNo = i + 1}
            <button onclick={() => {fetchItems(pageNo)}} class={cn("flex items-center font-mono text-base font-semibold justify-center w-8 h-8 bg-card text-neutral-100", currentPage === pageNo && 'bg-neutral-700')}>{pageNo}</button>
          {/each}
        </div>
      {/if}
    </Card>
  </div>
{/if}

{#if !outfit}
  <!-- Display skeleton loader -->
  <Card>
    <!-- Outfit name -->
    <div class="animate-pulse bg-neutral-800 h-4 w-1/2 mx-auto rounded-xl"></div>
    <!-- Outfit item's list -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each {length:5} as _}
        <div class="flex flex-col items-center gap-2">
          <!-- Item's image -->
          <div class="h-[200px] animate-pulse bg-neutral-800 w-full rounded-lg"></div>
          <!-- Item's name -->
          <div class="animate-pulse bg-neutral-800 h-4 w-1/2 mx-auto rounded-xl"></div>
        </div>
      {/each}
    </div>
  </Card>
{:else if outfit.elements.length === 0}
  <Card>
    <h3>No elements in this outfit</h3>
  </Card>
{:else}
  <Card class="relative">
    <h3>{outfit.name}</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each outfit.elements as item}
        <a href="/app/items/{item.id}" class="flex flex-col items-center gap-2">
          <img src={getImageUrl(item.image)} alt="" class="h-[200px] object-cover rounded-lg" />
          <p class="font-mono text-base text-center">{item.name}</p>
        </a>
      {/each}
    </div>
    <Button onclick={() => (editOutfitModalVisible = true)} variant="primary square" class="absolute top-2 right-2">
      <Pencil class="size-5" />
    </Button>
  </Card>
{/if}
