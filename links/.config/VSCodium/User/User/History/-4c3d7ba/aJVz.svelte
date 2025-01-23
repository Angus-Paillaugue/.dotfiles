<script>
  import { SEO, Card, Button, Input } from '$lib/components';
  import { getImageUrl, cn } from '$lib/utils';
  import { toast } from '$lib/components/Toast';
	import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
	import { fade, fly } from 'svelte/transition';
  import { enhance } from '$app/forms';

  const { form } = $props();
  let items = $state([]);
  let currentPage = $state();
  let isLoadingItems = $state(true);
  let skeletonNumberOfItems = 25;
  let selectedItems = $state([]);
  let isCreatingOutfit = $state(false);
  let outfitNameModalVisible = $state(false);

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
    if(selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((item) => item !== id);
    } else {
      selectedItems.push(id);
    }
  }

  $effect(() => {
    if(form?.error) {
      toast.error({ message: form.error });
    }
  })
</script>

<SEO title="Create an outfit" description="Create an outfit" />

<svelte:window onkeydown={(e) => {if(e.key === 'Escape')outfitNameModalVisible = false}} />

{#if outfitNameModalVisible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="inset-0 fixed z-30 bg-neutral-950/50 backdrop-blur-sm" transition:fade onclick={() => (outfitNameModalVisible = false)}></div>
  <div class="fixed inset-0 flex z-30 flex-col items-center justify-center" transition:fly={{ y:'100%' }}>
    <Card class="w-full max-w-md">
      <form
        method="POST"
        action='?/createOutfit'
        class="max-w-screen-md mx-auto w-full space-y-4"
        use:enhance={(e) => {
          isCreatingOutfit = true;
          for (const item of selectedItems) {
            e.formData.append(`items[]`, item);
          }
          return async ({ update }) => {
            // Removes the default behavior of the form being reset after submission
            update({ reset: false });
            isCreatingOutfit = false;
          };
        }}
      >
        <h2>Give a name tou your outfit</h2>
        <Input label="Outfit name" name="name" required />
        <Button loading={isCreatingOutfit} type="submit">Create outfit</Button>
      </form>
    </Card>
  </div>
{/if}

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
      {@const isSelected = selectedItems.includes(item.id)}
      <Card onclick={() => {toggleItem(item.id)}} class={cn("items-center justify-between flex flex-col lg:p-0 p-0 overflow-hidden space-y-0", isSelected && 'ring-4 ring-neutral-400/50')}>
        <img src={getImageUrl(item)} alt="" class="h-[200px] object-cover rounded-lg">
        <div class="p-4">
          <p class="font-mono text-base text-center">{item.name}</p>
        </div>
      </Card>
    {/each}
  {/if}
</div>

{#if selectedItems.length > 0}
  <div class="fixed bottom-24 left-0 right-0" transition:fly={{ y:'50%' }}>
    <div class="max-w-screen-md mx-auto w-full">
      <Card class="ml-auto w-fit">
        <p class="text-neutral-100 font-mono text-base">{selectedItems.length} items selected</p>
        <Button onclick={() => (outfitNameModalVisible = true)}>Create outfit</Button>
      </Card>
    </div>
  </div>
{/if}

<!-- Pagination -->
{#if items?.totalPages > 1}
  <div class="shrink-0 flex flex-row items-center justify-center mx-auto gap-px rounded-xl overflow-hidden mt-4">
    {#each {length:items.totalPages} as _, i}
      {@const pageNo = i + 1}
      <button onclick={() => {fetchItems(pageNo)}} class={cn("flex items-center font-mono text-base font-semibold justify-center w-8 h-8 bg-card text-neutral-100", currentPage === pageNo && 'bg-neutral-700')}>{pageNo}</button>
    {/each}
  </div>
{/if}
