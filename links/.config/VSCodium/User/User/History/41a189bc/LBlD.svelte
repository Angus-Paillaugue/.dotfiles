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
</script>

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
