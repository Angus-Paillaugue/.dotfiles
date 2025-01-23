<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Track from '$lib/songs/Track.svelte';
	import type { Playlist } from '$lib/types';
	import { PenIcon } from 'lucide-svelte';

	let { data } = $props();

	let playlist = $state<Playlist>(data.playlist);
	let ediPlaylistModalOpen = $state<boolean>(false);
	let isSavingPlaylist = $state<boolean>(false);

	async function updatePlaylist(e: Event) {
		e.preventDefault();
		isSavingPlaylist = true

		const res = await fetch(`/api/playlist/${data.playlist.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(playlist),
		});

		if (res.ok) {
			ediPlaylistModalOpen = false;
		}
	}
</script>

<Modal bind:open={ediPlaylistModalOpen}>
	<h1 class="text-xl font-medium">Edit playlist</h1>

	<form
		method="POST"
		class="flex flex-col gap-2"
		onsubmit={updatePlaylist}
	>

		<div class="flex flex-col gap-1 mt-4">
			<label for="playlistTitle">Title</label>
			<Input bind:value={playlist.title} name="playlistTitle" />
		</div>

		<Button
			type="submit"
			class="ml-auto"
			disabled={isSavingPlaylist}
			loading={isSavingPlaylist}
		>
			Save
		</Button>

	</form>

</Modal>

<div class="mx-auto flex w-full max-w-screen-lg flex-col gap-4 mt-4">
	<div
		class="flex flex-row items-center justify-between"
	>
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
