<script lang="ts">
	import '../app.css';
  import Sidebar from './sidebar.svelte';
	import Nav from './nav.svelte';
	import ContextMenu from './context-menu.svelte';
	import Player from '$lib/songs/Player/Player.svelte';
	import { playlists, songs, albums } from '$lib/stores';
	import Toaster from '$lib/components/Toaster.svelte';

	let { data, children } = $props();
	$songs = data.songs;
	$playlists = data.playlists;
	$albums = data.albums;
</script>

<ContextMenu />

<Toaster />

<div class="flex h-screen flex-col overflow-hidden">
	<Nav bind:open={sidebarOpen} />

	<div class="flex w-full grow flex-row overflow-hidden">
		<Sidebar />
		<div class="h-full grow overflow-y-auto p-2">
			{@render children?.()}
		</div>
	</div>

	<Player />
</div>
