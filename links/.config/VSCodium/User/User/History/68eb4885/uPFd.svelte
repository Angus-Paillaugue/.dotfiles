<script lang="ts">
  import Grid from './grid.svelte'
  import type { PageData } from './$types';
  import type { Card, Dashboard } from '$lib/server/db/dashboard';
  import { toast } from 'svelte-sonner';
  import { Plus } from 'lucide-svelte'
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let { data }: { data: PageData } = $props();
  let dashboard: Dashboard = $state(data.dashboard);
  let cards = $state(dashboard.cards);
  let isSaving = $state(false);
  let addCardModalOpen = $state(false);

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
    }
    isSaving = false;
  }
</script>

<Dialog.Root bind:open={addCardModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add card</Dialog.Title>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

<div class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
  <div class="flex flex-row items-center justify-between">
    <h1 class="text-lg font-semibold">{dashboard.title}</h1>
    <Button><Plus class="size-6" />Add card</Button>
  </div>
  <Grid bind:cards {onSwap} />
</div>
