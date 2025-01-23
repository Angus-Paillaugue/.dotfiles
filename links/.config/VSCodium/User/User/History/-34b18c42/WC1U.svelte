<script lang="ts">
	import AddToPlaylist from '$lib/songs/add-to-playlist.svelte';
	import { currentlyPlayingSong, songs, toast } from '$lib/stores';
	import type { Song } from '$lib/types';
	import { ListMusic, LoaderCircle, PenIcon, Trash2 } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let contextMenuOpen = $state<boolean>(false);
	let contextMenuCoords = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let track: Song | null = $state(null);
	let isDeletingTrack = $state<boolean>(false);
	let addSongToPlaylistModalOpen = $state<boolean>(false);

	function onClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.closest('.context-menu')) return;
		contextMenuOpen = false;
	}

	function onContextMenu(e: MouseEvent) {
		e.preventDefault();
		const target = e.target as HTMLElement;
		if (target.closest('.track')) {
			let trackId = (target.closest('.track') as HTMLDivElement).dataset.trackId as string;
			track = $songs.find((song) => song.id === trackId) || null;
			const coords = { x: e.clientX, y: e.clientY };
			contextMenuCoords = coords;
			contextMenuOpen = true;
		}
	}

	async function deleteSong() {
		if(!track) return;
		isDeletingTrack = true;
		const res = await fetch(`/api/song/${track.id}/delete`, {
			method: 'DELETE',
		});

		if (!res.ok) {
			console.error('Failed to delete song');
			toast.error('Failed to delete song');
			isDeletingTrack = false;
			return;
		}
		$songs = $songs.filter((song) => track && song.id !== track.id);
		if($currentlyPlayingSong?.id === track.id) {
			$currentlyPlayingSong = null;
		}
		isDeletingTrack = false;
		contextMenuOpen = false;
		toast.success('Song deleted successfully');
	}
</script>

{#if track}
	<AddToPlaylist bind:open={addSongToPlaylistModalOpen} song={track} />
{/if}

<svelte:window oncontextmenu={onContextMenu} onclick={onClick} />

{#if contextMenuOpen}
	<div
		class="context-menu absolute z-20 w-[170px] overflow-hidden rounded-lg border border-border bg-background"
		style="top: {contextMenuCoords.y}px; left: {contextMenuCoords.x}px;"
		transition:slide={{ duration: 300, axis: 'y' }}
	>
		<button
			class="text-text flex w-full flex-row items-center gap-2 border-b border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
		>
			<PenIcon class="size-4" />
			Edit song
		</button>
		<button
			onclick={() => (addSongToPlaylistModalOpen = true)}
			class="text-text flex w-full flex-row items-center gap-2 border-b border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
		>
			<ListMusic class="size-4" />
			Add to playlist
		</button>
		<button
			onclick={deleteSong}
			class="text-text flex w-full flex-row items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-destructive/50 hover:text-destructive-foreground"
			disabled={isDeletingTrack}
		>
			{#if isDeletingTrack}
				<LoaderCircle class="size-4 animate-spin" />
			{:else}
			<Trash2 class="size-4" />
			{/if}
			Delete song
		</button>
	</div>
{/if}
