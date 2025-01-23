<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';
	import { Input } from '$lib/components';
	import { isDeepEqual } from '$lib/utils';

	let { data }: { data: PageData } = $props();
	let { note } = data;

  let isSaved = $derived(isDeepEqual(note, editedNote))

  let editedNote = $state(note);

  $inspect(editedNote.title)
</script>

<div class="max-w-screen-md mx-auto w-full">
  <Input bind:value={editedNote.title} id="noteTitle" debounce={500} placeholder="Title" class="text-2xl font-bold" />
  {#if note.type === 'text'}
    <TextNoteComponent note={editedNote as TextNote} />
  {:else if note.type === 'list'}
    <ListNoteComponent note={editedNote as ListNote} />
  {:else}
    <p>Unknown note type: {editedNote.type}</p>
  {/if}
</div>
