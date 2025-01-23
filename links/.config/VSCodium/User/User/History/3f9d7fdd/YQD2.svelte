<script lang="ts">
	import { Button, Card, Input } from '$lib/components';
	import { Send } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { user } = data;
	console.log(user);
</script>

<div class="mx-auto w-full max-w-xl grow">
	<form method="POST"  class="relative w-full">
		<Input id="newNoteTitle" placeholder="Create a new note" class="py-2 px-4" />
    <Button variant="icon" loading={false} class="absolute top-1.5 bottom-1.5 right-1.5 p-1.5 size-auto aspect-square hover:bg-card">
      <Send class="size-full" />
    </Button>
	</form>
</div>
