<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as Table from "$lib/components/ui/table/index.js";

  let { log }: { log: Record<string, any> | null;} = $props();

  let isOpen: boolean = $state(false);

  $effect(() => {
    if (log) {
      isOpen = true;
    }else {
      isOpen = false;
      log = null;
    }
  })
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
          {#each log.getAllColumns() as col}
            <Table.Row>
              <Table.Cell class="font-medium">{col}</Table.Cell>
              <Table.Cell>{col}</Table.Cell>
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
