<script lang="ts">
	import { Button, Card, Input, Select } from '$lib/components';
	import { Send } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
  import type { NoteType } from '$lib/types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
	const { user } = data;

  let isCreatingNote = $state(false);
  const noteTypes =
</script>

<div class="mx-auto w-full max-w-xl grow">
	<form
    method="POST"
    action="?/createNote"
    class="relative w-full mb-10"
    use:enhance={() => {
      isCreatingNote = true;
      return async ({ update }) => {
        await update({ reset: false });
        isCreatingNote = false;
      };
    }}
  >
    <Select id="newNoteType" name="newNoteType" class="py-2 px-4 rounded-lg" required>
      <option value="" disabled selected>Select a note</option>
    </Select>
		<Input id="newNoteTitle" placeholder="Create a new note" class="py-2 px-4 rounded-lg" />
    <Button variant="icon" loading={false} class="absolute top-1.5 bottom-1.5 right-1.5 p-1.5 size-auto aspect-square hover:bg-card">
      <Send class="size-full" />
    </Button>
	</form>

  {#each user.notes as note}
    <Card class="mb-4" href="/{user.username}/{note.id}">
      <Card.Heading>{note.title}</Card.Heading>
    </Card>
  {/each}
</div>
