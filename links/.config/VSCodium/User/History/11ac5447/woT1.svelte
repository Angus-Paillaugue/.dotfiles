<script lang="ts">
	import type { PageData } from './$types';
  import TextNoteComponent from './text-note.svelte';
  import ListNoteComponent from './list-note.svelte';
	import type { TextNote, ListNote } from '$lib/types';
	import { Input, Card } from '$lib/components';
	import { Cloud, RefreshCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	let note = $state(data.note);
  let isSaving = $state(false);
  let isMounted = $state(false);

  async function save() {
    if(isSaving || !isMounted) return;
    isSaving = true;
    console.log('Saving note');
    const url = `/api/note/${note.type}/save`
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        note
      })
    });
    if(!res.ok) {
      console.error('Failed to save note');
      return;
    }

    const { note: noteFromServer } = await res.json();
    if(note.type === 'list') {
      // Set id's to the list items because we set them to `-1` on the client.
      (note as ListNote).items.map((item, i) => {
        item.id = noteFromServer.items[i].id;
      });
    }
    isSaving = false;
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div class="max-w-screen-md mx-auto w-full grow flex flex-col gap-2 p-1">
  <Input bind:value={note.title} id="noteTitle" debounce={500} placeholder="Title" class="text-2xl font-bold shrink-0" />
  {#if note.type === 'text'}
    <TextNoteComponent bind:note={note as TextNote} {save} />
  {:else if note.type === 'list'}
    <ListNoteComponent bind:note={note as ListNote} {save} />
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
