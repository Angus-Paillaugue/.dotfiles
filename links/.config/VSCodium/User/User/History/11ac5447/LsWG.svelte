<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';

	let { data }: { data: PageData } = $props();
	let { note } = data;
	$inspect(note);
</script>



{#if note.type === 'text'}
  <TextNoteComponent note={note as TextNote} />
{:else if note.type === 'list'}
  <ListNoteComponent note={note as ListNote} />
{:else}
  <p>Unknown note type: {note.type}</p>
{/if}
