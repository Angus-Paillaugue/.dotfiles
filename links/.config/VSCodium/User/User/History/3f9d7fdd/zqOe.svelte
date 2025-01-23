<script lang="ts">
	import { Button, Card, Input, Select } from '$lib/components';
	import { List, Send, Text } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData, form: ActionData } = $props();
	const { user } = data;

  let isCreatingNote = $state(false);
  const noteTypes = [
    {
      icon: Text,
      name: 'Text',
      value: 'text'
    },
    {
      icon: List,
      name: 'List',
      value: 'list'
    }
  ]
</script>

<div class="mx-auto w-full max-w-xl grow">
	<form
    method="POST"
    action="?/createNote"
    class="relative w-full mb-10 flex flex-row gap-2"
    use:enhance={() => {
      isCreatingNote = true;
      return async ({ update }) => {
        await update({ reset: false });
        isCreatingNote = false;
      };
    }}
  >
    <Select id="newNoteType" name="newNoteType" class="rounded-lg" required>
      {#each noteTypes as type}
        <Select.Option value={type.value}>{type.name}</Select.Option>
      {/each}
    </Select>
		<Input id="newNoteTitle" placeholder="Create a new note" class="py-2 px-4 rounded-lg" />
    <Button variant="icon" loading={false} class="absolute top-1.5 bottom-1.5 right-1.5 p-1.5 size-auto aspect-square hover:bg-card">
      <Send class="size-full" />
    </Button>
	</form>

  <div class="flex flex-col gap-8">
    {#each user.notes as note}
      <Card class="mb-4" href="/{user.username}/{note.id}">
        <Card.Heading>{note.title}</Card.Heading>
      </Card>
    {/each}
  </div>
</div>
