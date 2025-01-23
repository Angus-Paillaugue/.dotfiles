<script>
  import { SEO, Card , Button} from '$lib/components';
  import { Pencil } from 'lucide-svelte';
  import { getImageUrl } from '$lib/utils';
	import { onMount } from 'svelte';
  import { toast } from '$lib/components/Toast';
  import { fade, fly } from 'svelte/transition';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
  let outfit = $state();
  const { id } = data;
  let editOutfitModalVisible = $state(false);

  async function getOutfit() {
    const res = await fetch(`/api/fetchOutfit?id=${id}`);
    if(!res.ok) {
      toast.error({ message:'Failed to fetch outfit' });
      return;
    }
    const data = await res.json();
    outfit = data;
  }

  onMount(getOutfit);

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

    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }
</script>

<SEO title="Outfit" description="My outfits" />

{#if editOutfitModalVisible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed bg-neutral-950/50 backdrop-blur-sm inset-0 z-30" transition:fade onclick={() => (editOutfitModalVisible = false)}></div>
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md w-full z-40" transition:fly={{ y:'100%' }}>
    <Card>
      <h3>Edit outfit</h3>
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
