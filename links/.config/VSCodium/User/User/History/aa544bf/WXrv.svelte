<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { FlexRender, renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
  import { columns } from './columns.js';
    import type { Component } from "svelte";

  let { log }: { log: Record<string, any> | null;} = $props();

  let isOpen: boolean = $state(false);

  $effect(() => {
    if (log) {
      isOpen = true;
    } else {
      isOpen = false;
    }
  });

  function renderValue(key: string, value: any) {
    const column = columns.find(col => col.id === key);
    if (column && column.cell) {
      return renderComponent(column.cell as unknown as Component<any, {}, string>, { row: { original: log, getValue: () => value } });
    }
    return value;
  }
</script>

<Drawer.Root bind:open={isOpen}>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Log details</Drawer.Title>
    </Drawer.Header>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Key</Table.Head>
          <Table.Head>Value</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#if log}
          {#each Object.entries(log) as [key, value]}
            <Table.Row>
              <Table.Cell class="font-medium">{key}</Table.Cell>
              <Table.Cell>
                {#if typeof value === 'object'}
                  <FlexRender content={renderValue(key, value)} context={{}} />
                {:else}
                  {renderValue(key, value)}
                {/if}
              </Table.Cell>
            </Table.Row>
          {/each}
        {/if}
      </Table.Body>
    </Table.Root>

    <Drawer.Footer>
      <Drawer.Close>Close</Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>
