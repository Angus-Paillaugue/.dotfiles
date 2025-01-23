<script lang="ts">
  import Grid from './grid.svelte';
  import { pageMetadata } from '$lib/stores';
  import type { PageData } from './$types';
  import type { Card, Dashboard } from '$lib/server/db/dashboard';
  import { toast } from 'svelte-sonner';
  import { Plus } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  let { data }: { data: PageData } = $props();
  let dashboard: Dashboard = $state(data.dashboard);
  let isSaving = $state(false);
  let addCardModalOpen = $state(false);
  let isAddingCard = $state(false);

  $effect(() => {
    pageMetadata.set({
      title: dashboard.title,
      description: dashboard.description || '',
      breadcrumbs: [{ name: 'Dashboards' }, { name: dashboard.title }]
    });
  });

  const onSwap = (cards: Card[]) => {
    cards = cards.map((card, index) => ({ ...card, rank: index }));
    dashboard.cards = cards;
    saveDashboard();
  }

  async function saveDashboard() {
    isSaving = true;
    const res = await fetch(`/api/dashboard/save`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({dashboard}),
    });
    if (!res.ok) {
      toast.error('Failed to save dashboard');
    }
    const data = await res.json();
    if(data.error) {
      toast.error(data.message);
    }else {
      dashboard = data.dashboard;
    }
    isSaving = false;
  }

  async function addCard(event: Event) {
    isAddingCard = true;
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    if (!title) {
      toast.error('Card title is required');
      isAddingCard = false;
      return;
    }
    const description = formData.get('description') as string;
    const card = {
      title,
      description,
      rank: dashboard.cards.length,
    };
    dashboard.cards.push(card as Card);
    await saveDashboard();
    addCardModalOpen = false;
    isAddingCard = false;
  }
</script>

<Dialog.Root bind:open={addCardModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add card</Dialog.Title>
    </Dialog.Header>
    <form onsubmitcapture={addCard} class="space-y-4">
      <div class="flex flex-col gap-1">
        <Label for="title">Card title</Label>
        <Input type="text" name="title" placeholder="Title" />
      </div>

      <div class="flex flex-col gap-1">
        <Label for="description">Card description</Label>
        <Input type="text" name="description" placeholder="Description" />
      </div>

      <div class="grid gris-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <Label for="description">Card type</Label>
          <Select.Root type="single">
            <Select.Trigger></Select.Trigger>
            <Select.Content>
              <Select.Item value="light">Light</Select.Item>
              <Select.Item value="dark">Dark</Select.Item>
              <Select.Item value="system">System</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-1">
          <Label for="description">Col span</Label>
          <Select.Root type="single">
            <Select.Content>
              {#each Array(3) as _, index}
                <Select.Item value={(index + 1).toString()}>{index + 1}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <div class="flex flex-row justify-end gap-2">
        <Button type="button" variant="outline" onclick={() => (addCardModalOpen = false)}>Cancel</Button>
        <Button type="submit" disabled={isAddingCard} loading={isAddingCard}>Add card</Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
  <div class="flex flex-row items-center justify-between">
    <h1 class="text-lg font-semibold">{dashboard.title}</h1>
    <Button onclick={() => (addCardModalOpen = true)}><Plus class="size-6" />Add card</Button>
  </div>
  <Grid bind:cards={dashboard.cards} {onSwap} />
</div>
