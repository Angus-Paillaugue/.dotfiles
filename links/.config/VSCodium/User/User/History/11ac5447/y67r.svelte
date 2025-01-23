<script lang="ts">
	import type { PageData } from './$types';
  import TextNote from './text-note.svelte';
  import ListNote from './list-note.svelte';

	let { data }: { data: PageData } = $props();
	let { note } = data;

  const textNote = note as TextNote;

	$inspect(note);
</script>

{#if note.type === 'text'}
  <TextNote note={note} />
{:else if note.type === 'list'}
  <ListNote {note} />
{:else}
  <p>Unknown note type: {note.type}</p>
{/if}
