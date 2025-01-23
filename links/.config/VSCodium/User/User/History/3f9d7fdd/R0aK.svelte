<script lang="ts">
	import { Button, Card, Input } from '$lib/components';
	import { Send } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { user } = data;
	console.log(user);
</script>

<div class="mx-auto w-full max-w-xl grow">
	<div class="relative w-full">
		<Input id="newNoteTitle" placeholder="Create a new note" class="py-2 px-4" />
    <Button variant="icon" class="absolute top-1/2 right-4 -translate-y-1/2 hover:bg-card">
      <Send class="size-full" />
    </Button>
	</div>
</div>
