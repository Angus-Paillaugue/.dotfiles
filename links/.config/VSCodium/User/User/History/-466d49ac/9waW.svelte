<script lang="ts">
  import { toast } from "svelte-sonner";
  import { pageMetadata } from '$lib/stores';
  import { Input } from '$lib/components/ui/input/index.js';
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from '$lib/components/ui/card';
  import LogsTable from "../LogsTable.svelte";
  import type { Logs } from "../columns";


  pageMetadata.set({
    title: 'Search logs',
    description: 'Search for logs',
    breadcrumbs: [{ name: 'Logs' }, { name: 'Search' }]
  });

  const { data } = $props();
  const { user } = data;

  let searchValue = $state('');
  let isSearching = $state(false);
  let currentPage = $state(0);
  let numberOfPages = $state(0);
  let resultsPerPage = $state(10);


  async function search(pageChange = false): Logs[] | null {
    if(!pageChange) {
      currentPage = 0;
    }
    isSearching = true;
    const res = await fetch(`/api/logs/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: searchValue, page: currentPage, resultsPerPage }),
    });
    if(!res.ok) {
      toast.error('Failed to search logs');
      isSearching = false;
      return null;
    }

    const data = await res.json();
    if(data.error) {
      toast.error(data.message);
      isSearching = false;
      return null;
    }

    numberOfPages = data.numberOfPages;
    return data.results;
  }
</script>

<div class="flex w-full flex-col">
  <div class="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Card.Root>
      <Card.Header>
        <Card.Title>Search</Card.Title>
        <Card.Description
          >Search for logs.</Card.Description
        >
      </Card.Header>
      <Card.Content>
        <form onsubmitcapture={search}>
          <div class="flex flex-row gap-4">
            <Input bind:value={searchValue} placeholder="Search" />
            <Button type="submit" loading={isSearching} disabled={isSearching}>
              Search
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card.Root>
    <LogsTable {user} getResults={search} bind:numberOfPages />
  </div>
</div>
