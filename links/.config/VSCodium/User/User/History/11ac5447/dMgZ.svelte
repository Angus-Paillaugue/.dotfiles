<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';
	import { Input, Card } from '$lib/components';
	import { Cloud, RefreshCcw } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	let note = $state(data.note);

  let isSaving = $state(false);
</script>

<div class="max-w-screen-md mx-auto w-full grow flex flex-col gap-2 p-1">
  <Input bind:value={editedNote.title} id="noteTitle" debounce={500} placeholder="Title" class="text-2xl font-bold shrink-0" />
  {#if note.type === 'text'}
    <TextNoteComponent bind:note={note as TextNote} />
  {:else if note.type === 'list'}
    <ListNoteComponent bind:note={note as ListNote} />
  {/if}

  <Card class="w-full shrink-0">
    <div class="size-5">
      {#if isSaving}
        <RefreshCcw class="size-full" />
      {:else}
        <Cloud class="size-full" />
      {/if}
    </div>
  </Card>
</div>
