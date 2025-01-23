<script lang="ts">
	import { Button } from '$lib/components';
	import type { ListNote, ListNoteItem } from '$lib/types';
	import { Plus } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import ListNoteItemComponent from './list-note-item.svelte';

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
		note.items = note.items.filter((i) => i.id !== item.id);
		save();
	}

	$inspect(note.items);
</script>

<svelte:head>
	<title>{note.title}</title>
</svelte:head>

<div class="flex h-full w-full grow flex-col gap-2 bg-background text-foreground">
	<!-- Unchecked Items -->
	<div class="flex flex-col">
		<!-- Heading -->
		<div class="flex w-full flex-row items-center gap-2">
			<div class="h-0 w-full grow border-b border-border"></div>
			<h1 class="shrink-0 text-xl font-semibold">To Do</h1>
			<div class="h-0 w-full grow border-b border-border"></div>
		</div>

		<!-- Items -->
		<div class="flex flex-col gap-2">
			{#each note.items as item, i (item.id)}
				<div animate:flip transition:slide={{ axis: 'y' }}>
					<ListNoteItemComponent item={note.items[i]} {deleteItem} {save} />
				</div>
			{/each}
		</div>
	</div>

	<!-- Checked Items -->
	<!-- <div class="flex flex-col">
    <div class="flex flex-row w-full gap-2 items-center">
      <div class="w-full grow border-b h-0 border-border"></div>
      <h1 class="shrink-0 text-xl font-semibold">Checked</h1>
      <div class="w-full grow border-b h-0 border-border"></div>
    </div>

    <div class="flex flex-col gap-2">
      {#each note.items as item, i (item.id)}
        <div animate:flip transition:slide={{ axis: 'y' }}>
          <ListNoteItemComponent item={note.items[i]} {deleteItem} {save} />
        </div>
      {/each}
    </div>
  </div> -->

	<!-- Add item to list -->
	<Button variant="secondary" class="w-full" onclick={() => addListItem(false)}>
		<Plus class="size-5" />
		Add Item
	</Button>
</div>
