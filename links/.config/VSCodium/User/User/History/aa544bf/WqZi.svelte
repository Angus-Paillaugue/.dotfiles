<script lang="ts">
  import type { Log } from '@shared/types';
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as Table from "$lib/components/ui/table/index.js";

  let { log }: { log: Record<string, any> | null;} = $props();

  let isOpen: boolean = $state(false);

  $effect(() => {
    if (log) {
      isOpen = true;
    }else {
      isOpen = false;
    }
  })
</script>


<Drawer.Root bind:open={isOpen}>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Log details</Drawer.Title>
    </Drawer.Header>

    <Table.Root>
      <Table.Caption>A list of your recent invoices.</Table.Caption>
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
              <Table.Cell>{value}</Table.Cell>
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
