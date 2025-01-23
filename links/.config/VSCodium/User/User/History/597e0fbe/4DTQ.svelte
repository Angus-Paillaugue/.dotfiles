<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Track from '$lib/songs/Track.svelte';
	import type { Playlist } from '$lib/types';
	import { PenIcon } from 'lucide-svelte';

	let { data } = $props();

	let playlist = $state<Playlist>(data.playlist);
	let ediPlaylistModalOpen = $state<boolean>(false);
</script>

<Modal bind:open={ediPlaylistModalOpen}>
	<p>Coming soon...</p>
</Modal>

<div class="mx-auto flex w-full max-w-screen-lg flex-col gap-4 mt-4">
	<div class="flex flex-row items-center justify-between">
		<h1 class="text-2xl font-bold">
			{playlist.title}
		</h1>

		<Button class="size-7 p-1.5" onclick={() => ediPlaylistModalOpen = true}>
			<PenIcon class="size-full" />
		</Button>
	</div>
	<div class="flex flex-col p-2">
		{#each playlist.songs as song}
			<Track format="list" {song} />
		{:else}
			<div class="flex flex-col gap-2 items-center justify-center">
				<p class="text-3xl font-medium">No songs found</p>
			</div>
		{/each}
	</div>
</div>
