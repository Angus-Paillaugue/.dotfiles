<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';

	let { data }: { data: PageData } = $props();
	let { note } = data;

  const textNote = note as TextNote;

	$inspect(note);
</script>

{#if note.type === 'text'}
  <TextNoteComponent note={note} />
{:else if note.type === 'list'}
  <ListNoteComponent {note} />
{:else}
  <p>Unknown note type: {note.type}</p>
{/if}
