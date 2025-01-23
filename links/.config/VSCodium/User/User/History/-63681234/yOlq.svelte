<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { pageMetadata } from '$lib/stores';
  import { Plus } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import NewServerForm from "./NewServerForm.svelte";

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
      <Card.Content>

        <Button onclick={() => (addServerModalOpen = true)}>
          <Plus class="size-6" />
          Add a server
        </Button>

      </Card.Content>
    </Card.Root>
  </div>
</div>
