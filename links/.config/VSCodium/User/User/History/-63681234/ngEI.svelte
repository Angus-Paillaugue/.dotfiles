<script lang="ts">
  import type { PageData } from './$types';
  import ServiceStatus from '$lib/components/ServiceStatus.svelte';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { pageMetadata } from '$lib/stores';
  import { Plus } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  let { data }: { data: PageData } = $props();

  let addServerModalOpen
</script>

<div class="flex w-full flex-col">
  <div class="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Card.Root>
      <Card.Header>
        <Card.Title>Your servers</Card.Title>
        <Card.Description>Here you can gat an at-a-glance overview of your servers.</Card.Description>
      </Card.Header>
      <Card.Content>

        <Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

      </Card.Content>
    </Card.Root>
  </div>
</div>
