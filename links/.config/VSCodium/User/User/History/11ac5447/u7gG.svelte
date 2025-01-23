<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';
	import { Input } from '$lib/components';

	let { data }: { data: PageData } = $props();
	let { note } = data;
</script>

<div class="max-w-screen-md mx-auto w-full">
  <Input bind:value={note.title} placeholder="Title" class="text-2xl font-bold" />
  {#if note.type === 'text'}
    <TextNoteComponent note={note as TextNote} />
  {:else if note.type === 'list'}
    <ListNoteComponent note={note as ListNote} />
  {:else}
    <p>Unknown note type: {note.type}</p>
  {/if}
</div>
