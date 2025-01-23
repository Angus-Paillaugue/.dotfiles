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
  let editedNote = $state(note);
  let checkedListItems = $derived(editedNote.items.filter(item => item.checked));
  let uncheckedListItems = $derived(editedNote.items.filter(item => !item.checked));

  $inspect(checkedListItems)
  $inspect(uncheckedListItems)

  function addListItem() {
    note.items.push({
      id: -1,
      item: '',
      checked: false,
      position: note.items.length
    });
    save();
  }

  function deleteItem(item: ListNoteItem) {
    editedNote.items = editedNote.items.filter(i => i.id !== item.id);
    save();
  }
</script>

<svelte:head>
  <title>{editedNote.title}</title>
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
      <!-- {#each uncheckedListItems as item, i (item.id)}
        <div animate:flip transition:slide={{ axis: 'y' }}>
          <ListNoteItemComponent bind:item={uncheckedListItems[i]} {deleteItem} {save} />
        </div>
      {/each} -->
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
      <!-- {#each checkedListItems as item, i (item.id)}
        <div animate:flip transition:slide={{ axis: 'y' }}>
          <ListNoteItemComponent bind:item={checkedListItems[i]} {deleteItem} {save} />
        </div>
      {/each} -->
    </div>
  </div>

  <!-- Add item to list -->
  <Button variant="secondary" class="w-full" onclick={addListItem}>
    <Plus class="size-5" />
    Add Item
  </Button>

</div>
