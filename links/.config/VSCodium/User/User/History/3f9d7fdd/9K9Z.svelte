<script lang="ts">
	import { Button, Card, Input } from '$lib/components';
	import { Send } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	const { user } = data;

  let isCreatingNote = $state(false)
</script>

<div class="mx-auto w-full max-w-xl grow">
	<form
    method="POST"
    action="?/createNote"
    class="relative w-full"
    use:enhance={() => {
      isCreatingNote = true;
      return async ({ update }) => {
        await update({ reset: false });
        isCreatingNote = false;
      };
    }}
  >
		<Input id="newNoteTitle" placeholder="Create a new note" class="py-2 px-4 rounded-lg" />
    <Button variant="icon" loading={false} class="absolute top-1.5 bottom-1.5 right-1.5 p-1.5 size-auto aspect-square hover:bg-card">
      <Send class="size-full" />
    </Button>
	</form>
</div>
