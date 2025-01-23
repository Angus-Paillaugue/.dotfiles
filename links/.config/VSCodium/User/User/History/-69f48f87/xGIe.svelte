<script lang="ts">
  import type { Card } from '$lib/server/db/dashboard';
  import { GripVertical, Trash2, Pencil, LoaderCircle } from 'lucide-svelte';
  import * as CardComponent from '$lib/components/ui/card/index.js';
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  let { card = $bindable(), onDragStart, onDragEnd, deleteCard }: { card: Card; onDragStart: (card: Card) => void; onDragEnd: () => void; deleteCard: (card:Card) => void } = $props();

  let editCardModalOpen = $state(false);
  let isEditingCard = $state(false);
  let isDeletingThisCard = $state(false);

  function editCard(): void {
    console.log('edit', card);
  }

  async function deleteThisCard(): Promise<void> {
    isDeletingThisCard = true;
    await deleteCard(card);
    isDeletingThisCard = false;
  }
</script>

<!-- Add card modal -->
<Dialog.Root bind:open={editCardModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add card</Dialog.Title>
    </Dialog.Header>
    <form onsubmitcapture={editCard} class="space-y-4">
      <div class="flex flex-col gap-1">
        <Label for="title">Card title</Label>
        <Input type="text" name="title" placeholder="Title" bind:value={card.title} />
      </div>

      <div class="flex flex-col gap-1">
        <Label for="description">Card description</Label>
        <Input type="text" name="description" placeholder="Description" bind:value={card.description} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <Label for="description">Card type</Label>
          <Select.Root type="single" bind:value={card.type}>
            <Select.Trigger>{card.type}</Select.Trigger>
            <Select.Content>
              <Select.Item value="table">Table</Select.Item>
              <Select.Item value="graph">Graph</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-1">
          <Label for="description">Col span</Label>
          <Select.Root type="single" bind:value={card.colSpan}>
            <Select.Trigger>{card.colSpan}</Select.Trigger>
            <Select.Content>
              {#each Array(3) as _, index}
                <Select.Item value={(index + 1).toString()}>{index + 1}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <div class="flex flex-row justify-end gap-2">
        <Button type="button" variant="outline" onclick={() => (editCardModalOpen = false)}>Cancel</Button>
        <Button type="submit" disabled={isEditingCard} loading={isEditingCard}>Add card</Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>

<!-- Delete card confirm modal -->
<Dialog.Root bind:open={editCardModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add card</Dialog.Title>
    </Dialog.Header>
    <form onsubmitcapture={editCard} class="space-y-4">
      <div class="flex flex-col gap-1">
        <Label for="title">Card title</Label>
        <Input type="text" name="title" placeholder="Title" bind:value={card.title} />
      </div>

      <div class="flex flex-col gap-1">
        <Label for="description">Card description</Label>
        <Input type="text" name="description" placeholder="Description" bind:value={card.description} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <Label for="description">Card type</Label>
          <Select.Root type="single" bind:value={card.type}>
            <Select.Trigger>{card.type}</Select.Trigger>
            <Select.Content>
              <Select.Item value="table">Table</Select.Item>
              <Select.Item value="graph">Graph</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-1">
          <Label for="description">Col span</Label>
          <Select.Root type="single" bind:value={card.colSpan}>
            <Select.Trigger>{card.colSpan}</Select.Trigger>
            <Select.Content>
              {#each Array(3) as _, index}
                <Select.Item value={(index + 1).toString()}>{index + 1}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <div class="flex flex-row justify-end gap-2">
        <Button type="button" variant="outline" onclick={() => (editCardModalOpen = false)}>Cancel</Button>
        <Button type="submit" disabled={isEditingCard} loading={isEditingCard}>Add card</Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>


{#snippet DataCardComponent(card: Card)}
  {#if card?.data}
    {@const cols = card.data.length > 0 ? Object.keys(card.data[0] as object) : []}
    <div class="w-full overflow-auto max-h-[500px]">
      <table>
        <thead>
          <tr>
            {#each cols as k}
              <th>{k}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each card.data as data}
            <tr>
              {#each Object.values(data as object) as v}
                <td>{v}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{/snippet}

{#snippet GraphCardComponent(card: Card)}
  <div>
    <pre>{JSON.stringify(card.config, null, 2)}</pre>
  </div>
{/snippet}

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <CardComponent.Root class="group">
      <CardComponent.Header>
        <div class="flex flex-row">
          {#if card?.title}
            <CardComponent.Title>{card.title}</CardComponent.Title>
          {/if}
          <div class="flex ml-auto hover:cursor-move translate-x-full flex-col items-center justify-center w-4 h-6 rounded-sm border bg-border transition-opacity opacity-0 group-hover:opacity-100">
            <GripVertical class="size-2.5" />
          </div>
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            draggable="true"
            ondragstart={() => onDragStart(card)}
            ondragend={onDragEnd}
            class="group-hover:z-10 w-4 h-6 -z-10"
          ></div>
        </div>
        {#if card?.description}
          <CardComponent.Description>{card.description}</CardComponent.Description>
        {/if}
      </CardComponent.Header>
      <CardComponent.Content>
        {#if typeof card === 'object' && 'data' in card}
          {@render DataCardComponent(card)}
        {:else if typeof card === 'object' && 'config' in card}
          {@render GraphCardComponent(card)}
        {/if}
      </CardComponent.Content>
    </CardComponent.Root>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item class="flex flex-row gap-2 items-center" onclick={() => (editCardModalOpen = true)}>
      <Pencil class="size-5" />
      Edit
    </ContextMenu.Item>
    <ContextMenu.Item variant="destructive" class="flex flex-row gap-2 items-center" onclick={deleteThisCard}>
      {#if isDeletingThisCard}
        <LoaderCircle class="size-5 animate-spin" />
      {:else}
      <Trash2 class="size-5" />
      {/if}
      Delete
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
