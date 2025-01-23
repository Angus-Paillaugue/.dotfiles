<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Track from '$lib/songs/Track.svelte';
	import { playlists, toast } from '$lib/stores';
	import type { Playlist } from '$lib/types';
	import { PenIcon, Trash2 } from 'lucide-svelte';

	let { data } = $props();

	let playlist = $state<Playlist>(data.playlist);
	let ediPlaylistModalOpen = $state<boolean>(false);
	let isSavingPlaylist = $state<boolean>(false);
	let deletePlaylistModalOpen = $state<boolean>(false);
	// svelte-ignore state_referenced_locally
	let editedPlaylist = $state(JSON.parse(JSON.stringify(playlist)));

	async function updatePlaylist(e: Event) {
		e.preventDefault();
		isSavingPlaylist = true

		const res = await fetch(`/api/playlist/save`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({playlist: editedPlaylist}),
		});

		if (res.ok) {
			ediPlaylistModalOpen = false;
			playlist = editedPlaylist;
			const index = $playlists.findIndex((p) => p.id === playlist.id);
			if (index !== -1) {
				$playlists[index] = playlist;
			}
			toast.success('Playlist saved successfully');
		}else {
			toast.error('Failed to save playlist');
		}

		isSavingPlaylist = false;
	}

	async function deletePlaylist() {
		const res = await fetch(`/api/playlist/delete`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({id: playlist.id}),
				});

				if (res.ok) {
					deletePlaylistModalOpen = false;
					$playlists = $playlists.filter((p) => p.id !== playlist.id);
					toast.success('Playlist deleted successfully');
				}else {
					toast.error('Failed to delete playlist');
				}
	}
</script>

<Modal bind:open={deletePlaylistModalOpen}>
	<h1 class="text-xl font-medium">Delete playlist</h1>
	<p class="text-sm">Are you sure you want to delete this playlist?</p>
	<div class="flex flex-row justify-between">
		<Button
			type="button"
			variant="secondary"
			onclick={() => deletePlaylistModalOpen = false}
		>
			Cancel
		</Button>
		<Button
			type="button"
			variant="destructive"
			onclick={deletePlaylist}
		>
			Delete
		</Button>
	</div>
</Modal>

<Modal bind:open={ediPlaylistModalOpen}>
	<h1 class="text-xl font-medium">Edit playlist</h1>

	<form
		method="POST"
		class="flex flex-col gap-2"
		onsubmit={updatePlaylist}
	>

		<div class="flex flex-col gap-1 mt-4">
			<label for="playlistTitle">Title</label>
			<Input bind:value={editedPlaylist.title} name="playlistTitle" />
		</div>

		<div class="flex flex-row justify-between">
			<Button
				type="button"
				variant="destructive"
				onclick={() => {ediPlaylistModalOpen = false; deletePlaylistModalOpen = true;}}
			>
				<Trash2 class="size-4" />
				Delete
			</Button>
			<Button
				type="submit"
				disabled={isSavingPlaylist}
				loading={isSavingPlaylist}
			>
				Save
			</Button>
		</div>

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
