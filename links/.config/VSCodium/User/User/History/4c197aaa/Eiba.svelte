<script lang="ts">
	import { Button } from "$lib/components";
	import type { ListNote, ListNoteItem } from "$lib/types";
	import { Plus } from "lucide-svelte";
	import { flip } from "svelte/animate";
	import { slide } from "svelte/transition";
	import ListNoteItemComponent from "./list-note-item.svelte";

  interface Props {
    note: ListNote;
    save: () => void;
  }

  let { note = $bindable(), save }: Props = $props();

  function addListItem(checked = false) {
    note.items.push({
      id: -1,
      item: '',
      checked: checked,
      position: note.items.length
    });
    save();
  }

  function deleteItem(item: ListNoteItem) {
    note.items = note.items.filter(i => i.id !== item.id);
    save();
  }
</script>

<svelte:head>
  <title>{note.title}</title>
</svelte:head>

<div class="grow w-full h-full bg-background text-foreground flex flex-col gap-2">

  <!-- Unchecked Items -->
  <div class="flex flex-col">
    <!-- Heading -->
    <div class="flex flex-row w-full gap-2 items-center">
      <div class="w-full grow border-b h-0 border-border"></div>
      <h1 class="shrink-0 text-xl font-semibold">To Do</h1>
      <div class="w-full grow border-b h-0 border-border"></div>
    </div>

    <!-- Items -->
    <div class="flex flex-col gap-2">
      {#each note.items as item, i (item.id)}
        {#if !item.checked}
          <!-- <div animate:flip transition:slide={{ axis: 'y' }}> -->
            <ListNoteItemComponent item={note.items[i]} {deleteItem} {save} />
          <!-- </div> -->
        {/if}
      {/each}
    </div>
  </div>

  <!-- Checked Items -->
  <div class="flex flex-col">
    <!-- Heading -->
    <div class="flex flex-row w-full gap-2 items-center">
      <div class="w-full grow border-b h-0 border-border"></div>
      <h1 class="shrink-0 text-xl font-semibold">Checked</h1>
      <div class="w-full grow border-b h-0 border-border"></div>
    </div>

    <!-- Items -->
    <div class="flex flex-col gap-2">
      {#each note.items as item, i (item.id)}
        {#if item.checked}
          <!-- <div animate:flip transition:slide={{ axis: 'y' }}> -->
            <ListNoteItemComponent item={note.items[i]} {deleteItem} {save} />
          <!-- </div> -->
        {/if}
      {/each}
    </div>
  </div>

  <!-- Add item to list -->
  <Button variant="secondary" class="w-full" onclick={() => (addListItem(false))}>
    <Plus class="size-5" />
    Add Item
  </Button>

</div>
