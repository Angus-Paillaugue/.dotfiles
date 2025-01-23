<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { pageMetadata } from '$lib/stores';
  import { Plus } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import NewServerForm from "./NewServerForm.svelte";
  import ServiceStatus from '$lib/components/ServiceStatus.svelte';

  pageMetadata.set({
    title: 'Servers',
    description: 'Manage your servers',
    breadcrumbs: [{ name: 'Servers' }],
  });

  let { data }: { data: PageData } = $props();

  let addServerModalOpen: boolean = $state(false);
</script>

<!-- Add a server modal -->
<Dialog.Root bind:open={addServerModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add a new server</Dialog.Title>
    </Dialog.Header>

    <NewServerForm data={data.newServerForm} bind:open={addServerModalOpen} />

  </Dialog.Content>
</Dialog.Root>

<div class="flex w-full flex-col">
  <div class="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Card.Root>
      <Card.Header>
        <Card.Title>Your servers</Card.Title>
        <Card.Description>Here you can gat an at-a-glance overview of your servers.</Card.Description>
      </Card.Header>
      <Card.Content class="space-y-8">

        <Button onclick={() => (addServerModalOpen = true)}>
          <Plus class="size-6" />
          Add a server
        </Button>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each data.servers as server}
            <Card.Root>
              <Card.Header>
                <div class="flex flex-row items-center justify-between">
                  <div class="flex flex-row gap-2 items-center">
                    <ServiceStatus isOnline={server.isOnline} />
                    <Card.Title>{server.name}</Card.Title>
                  </div>
                  <div class="">ID: {server.id}</div>
                </div>
              </Card.Header>
              <Card.Content>
                <div class="flex justify-between">
                  <div>
                    <Button href="/app/servers/{server.id}">Manage</Button>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        </div>

      </Card.Content>
    </Card.Root>
  </div>
</div>
