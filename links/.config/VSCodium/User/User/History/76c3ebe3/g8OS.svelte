<script lang="ts">
	import Modal from "$lib/components/Modal.svelte";
	import { playlists } from "$lib/stores";
	import type { Playlist, Song } from "$lib/types";
	import { cn } from "$lib/utils";

  interface Props {
    open: boolean;
    song: Song;
  }

  let { open = $bindable(false), song }: Props = $props();

  async function addSongToPlaylist(playlistName: string) {
    const res = await fetch(`/api/toggleSongFromPlaylist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ song: song, playlistName })
    });

    if(res.ok) {
      open = false;
    }

    const data = await res.json();
    if(data.error) {
      console.error(data.error);
    }else{
      if(data.isNowInPlaylist && song) {
        $playlists = $playlists.map(playlist => {
          if(playlist.name === playlistName) {
            return {
              ...playlist,
              songs: [...playlist.songs.filter(s => s !== null), song].filter(s => s !== null) as Song[]
            }
          }
          return playlist;
        });
      }else {
        $playlists = $playlists.map(playlist => {
          if(playlist.name === playlistName) {
            return {
              ...playlist,
              songs: playlist.songs.filter(s => s !== null && song && s.id !== song.id)
            }
          }
          return playlist;
        });
      }
    }
  }
</script>


<Modal bind:open>
  <div class="flex flex-col gap-4">
    <h2 class="text-lg font-medium">Add to playlist</h2>
    <div class="flex flex-col gap-1">
      {#each $playlists as playlist}
        <button class={cn("flex flex-row items-center gap-2 rounded-lg px-2 py-1 transition-all", song && playlist.songs.map(s => s.id).includes(song.id) ? 'bg-secondary' : '')} onclick={() => addSongToPlaylist(playlist.name)}>
          <span class="text-base font-medium">{playlist.name}</span>
          <span class="text-muted text-sm">({playlist.songs.length})</span>
        </button>
      {/each}
    </div>
  </div>
</Modal>
