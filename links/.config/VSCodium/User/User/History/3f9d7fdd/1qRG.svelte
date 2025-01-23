<script lang="ts">
	import { Card, Input } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { user } = data;
	console.log(user);
</script>

<div class="mx-auto w-full max-w-xl grow">
	<div class="relative w-full">
		<Input id="newNoteTitle" placeholder="Create a new note" />
	</div>
</div>
