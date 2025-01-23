<script lang="ts">
  import { toast } from "svelte-sonner";
  import { pageMetadata } from '$lib/stores';
  import { Input } from '$lib/components/ui/input/index.js';
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from '$lib/components/ui/card';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { hasPermission, PERMISSIONS } from '@shared/roles';
  import {
    type VisibilityState,
    type RowSelectionState
  } from '@tanstack/table-core';
  import { API_URL } from "$lib/constants";
  import LogsTable from "../LogsTable.svelte";


  pageMetadata.set({
    title: 'Search logs',
    description: 'Search for logs',
    breadcrumbs: [{ name: 'Logs' }, { name: 'Search' }]
  });

  const { data } = $props();
  const { user } = data;

  let searchValue = $state('');
  let results = $state([]);
  let isSearching = $state(false);
  let currentPage = $state(0);
  let numberOfPages = $state(0);
  let resultsPerPage = $state(10);
  let columnVisibility = $state<VisibilityState>({ logSource: false });
  let rowSelection = $state<RowSelectionState>({});
  let isDeletingLogs: boolean = $state(false);
  let deleteLogsConfirmModalVisible: boolean = $state(false);


  async function search(pageChange = false) {
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
      return;
    }

    const data = await res.json();
    if(data.error) {
      toast.error(data.message);
      isSearching = false;
      return;
    }

    results = data.results;
    numberOfPages = data.numberOfPages;
  }
</script>

<!-- Delete logs confirm modal -->
{#if hasPermission(user?.role, PERMISSIONS.DELETE_LOG)}
  <AlertDialog.Root bind:open={deleteLogsConfirmModalVisible}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete {table.getFilteredSelectedRowModel()
            .rows.length} log{table.getFilteredSelectedRowModel().rows.length > 1 ? 's' : ''}.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <Button disabled={isDeletingLogs} loading={isDeletingLogs} onclick={deleteLogs}
          >Continue</Button
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}

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
