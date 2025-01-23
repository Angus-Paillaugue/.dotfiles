<script lang="ts">
  import { toast } from "svelte-sonner";
  import { pageMetadata } from '$lib/stores';
  import { Input } from '$lib/components/ui/input/index.js';
  import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from '$lib/components/ui/table/index.js';
  import * as Card from '$lib/components/ui/card';
  import { LoaderCircle, ChevronRight, ChevronLeft } from 'lucide-svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { columns } from './columns';
  import { hasPermission, PERMISSIONS } from '@shared/roles';
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import {
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type VisibilityState,
    type RowSelectionState
  } from '@tanstack/table-core';
  import { API_URL } from "$lib/constants";


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
    isSearching = false;
  }

  async function nextPage() {
    if(currentPage >= numberOfPages - 1) {
      return;
    }
    currentPage += 1;
    await search(true);
  }

  async function previousPage() {
    if(currentPage <= 0) {
      return;
    }
    currentPage -= 1;
    await search(true);
  }

  async function deleteLogs() {
    isDeletingLogs = true;
    console.log(table.getFilteredSelectedRowModel().rows)
    const res = await fetch(API_URL+`/deletedLogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: table.getFilteredSelectedRowModel().rows.map((row) => row.original.logId) }),
    });
    if(!res.ok) {
      toast.error('Failed to delete logs');
      isDeletingLogs = false;
      return;
    }

    const data = await res.json();
    if(!data.success) {
      toast.error(data.message);
      isDeletingLogs = false;
      return;
    }

    toast.success('Logs deleted successfully');
    deleteLogsConfirmModalVisible = false;
    table.getRowModel().rows.forEach((row) => {
      row.toggleSelected(false);
    });
    isDeletingLogs = false;
    search();
  }

  const table = createSvelteTable({
    get data() {
      return results;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === 'function') {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
    state: {
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      }
    }
  });
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
    <div class="flex flex-col mt-6">
      <div class="flex flex-row items-center">
        <!-- Delete selected row(s) button -->
        {#if table.getFilteredSelectedRowModel().rows.length > 0 && hasPermission(user?.role, PERMISSIONS.DELETE_LOG)}
          <div transition:scale={{ duration: 400, easing: backOut, start: 0, opacity: 0 }}>
            <Button
              variant="destructive"
              size="sm"
              onclick={() => (deleteLogsConfirmModalVisible = true)}
            >
              Delete {table.getFilteredSelectedRowModel().rows.length} log{table.getFilteredSelectedRowModel()
                .rows.length > 1
                ? 's'
                : ''}
            </Button>
          </div>
        {/if}
      </div>
      <Table.Root>
        <Table.Header>
          {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
            <Table.Row>
              {#each headerGroup.headers as header (header.id)}
                <Table.Head>
                  {#if !header.isPlaceholder}
                    <FlexRender
                      content={header.column.columnDef.header}
                      context={header.getContext()}
                    />
                  {/if}
                </Table.Head>
              {/each}
            </Table.Row>
          {/each}
        </Table.Header>
        <Table.Body>
          {#if isSearching}
            <Table.Row>
              <Table.Cell colspan={columns.length} class="h-24">
                <div class="flex flex-row gap-2 items-center justify-center">
                  <LoaderCircle class="size-6 animate-spin" />
                  Searching...
                </div>
              </Table.Cell>
            </Table.Row>
          {:else}
            {#each table.getRowModel().rows as row (row.id)}
              <Table.Row
                data-state={row.getIsSelected() && 'selected'}
              >
                {#each row.getVisibleCells() as cell (cell.id)}
                  <Table.Cell>
                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                  </Table.Cell>
                {/each}
              </Table.Row>
            {:else}
              <Table.Row>
                <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
              </Table.Row>
            {/each}
          {/if}
        </Table.Body>
      </Table.Root>
      <!-- Table footer -->
      <div class="flex flex-row items-center justify-between py-4">
        <!-- Page number / Total pages -->
        <div class="text-sm font-medium text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div class="flex flex-row items-center space-x-6 lg:space-x-8">
          <!-- Page size selection -->
          <div class="flex flex-row items-center gap-2">
            <Label for="pageSizeSelect">Rows per page</Label>
            <Select.Root
              type="single"
              name="pageSizeSelect"
              value={resultsPerPage.toString()}
              onValueChange={(e) => {
                resultsPerPage = parseInt(e);
                table.setPageIndex(0);
                table.setPageSize(resultsPerPage);
                search(true);
              }}
            >
              <Select.Trigger class="w-[80px]">{resultsPerPage}</Select.Trigger>
              <Select.Content>
                <Select.Item value="10">10</Select.Item>
                <Select.Item value="30">30</Select.Item>
                <Select.Item value="50">50</Select.Item>
                <Select.Item value="100">100</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <!-- Current page index / Total pages -->
          <span class="text-sm font-semibold">
            Page {currentPage + 1} of {numberOfPages}
          </span>

          <!-- Pagination buttons -->
          <div class="flex items-center justify-end space-x-2">
            <Button
            variant="outline"
            class="aspect-square size-8 p-1"
            onclick={previousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft class="size-full" />
          </Button>
          <Button
            variant="outline"
            class="aspect-square size-8 p-1"
            onclick={nextPage}
            disabled={currentPage >= numberOfPages - 1}
          >
            <ChevronRight class="size-full" />
          </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
