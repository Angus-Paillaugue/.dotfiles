<script lang="ts">
	import '../app.css';
  import Sidebar from './sidebar.svelte';
	import Nav from './nav.svelte';
	import ContextMenu from './context-menu.svelte';
	import Player from '$lib/songs/Player/Player.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import { playlists, songs } from '$lib/stores';

	let { data, children } = $props();
	$songs = data.songs;
	$playlists = data.playlists;
	let createPlaylistModalOpen = $state<boolean>(false);
	let isCreatingPlaylist = $state<boolean>(false);

	async function createPlaylist(e: Event) {
		e.preventDefault();
		isCreatingPlaylist = true;
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get('name') as string;
		if (!name) return;
		const res = await fetch('/api/createPlaylist', {
			method: 'POST',
			body: JSON.stringify({ name }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (res.ok) {
			const data = await res.json();
			$playlists = [...$playlists, data.playlist];
			createPlaylistModalOpen = false;
		} else {
			console.error('Failed to create playlist');
		}
		isCreatingPlaylist = false;
	}
</script>

<ContextMenu />

<Modal bind:open={createPlaylistModalOpen}>
	<form class="flex flex-col gap-2 p-4" onsubmit={createPlaylist}>
		<h2 class="text-lg font-bold">Create a new playlist</h2>
		<Input type="text" name="name" placeholder="Playlist name" />
		<Button class="ml-auto" loading={isCreatingPlaylist} disabled={isCreatingPlaylist}
			>Create</Button
		>
	</form>
</Modal>

<div class="flex h-screen flex-col overflow-hidden">
	<Nav />

	<div class="flex w-full grow flex-row overflow-hidden">
		<!-- Sidebar -->
		<!-- TODO: Make it responsive -->
		<Sidebar />
		<div class="h-full grow overflow-y-auto p-2">
			{@render children?.()}
		</div>
	</div>

	<Player />
</div>
