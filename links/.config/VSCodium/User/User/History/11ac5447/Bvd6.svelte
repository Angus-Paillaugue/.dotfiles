<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';
	import { Input, Card } from '$lib/components';
	import { isDeepEqual } from '$lib/utils';
	import { Cloud, RefreshCcw } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	let { note } = data;
  let editedNote = $state(note);

  let isSaved = $derived(isDeepEqual(note, editedNote));
</script>

<div class="max-w-screen-md mx-auto w-full grow flex flex-col gap-2 p-1">
  <Input bind:value={editedNote.title} id="noteTitle" debounce={500} placeholder="Title" class="text-2xl font-bold shrink-0" />
  {#if note.type === 'text'}
    <TextNoteComponent bind:note={editedNote as TextNote} bind:editedNote={editedNote as TextNote} />
  {:else if note.type === 'list'}
    <ListNoteComponent bind:note={editedNote as ListNote} bind:editedNote={editedNote as TextNote} />
  {/if}

  <Card class="w-full shrink-0">
    <div class="size-5">
      {#if isSaved}
        <Cloud class="size-full" />
      {:else}
        <RefreshCcw class="size-full" />
      {/if}
    </div>
  </Card>
</div>
