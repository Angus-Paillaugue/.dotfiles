<script lang="ts">
	import type { Song } from "$lib/types";
	import { cn } from "$lib/utils";

  interface Props {
    open: boolean;
    song: Song;
    playlists: Playlist[];
  }

  let { open = $bindable(false), song, playlists }: Props = $props();
</script>


<Modal bind:open>
  <div class="flex flex-col gap-4">
    <h2 class="text-lg font-medium">Add to playlist</h2>
    <div class="flex flex-col gap-1">
      {#each playlists as playlist}
        <button class={cn("flex flex-row items-center gap-2 rounded-lg px-2 py-1 transition-all", $currentlyPlayingSong && playlist.songs.map(s => s.id).includes($currentlyPlayingSong.id) ? 'bg-secondary' : '')} onclick={() => addCurrentSongToPlaylist(playlist.name)}>
          <span class="text-base font-medium">{playlist.name}</span>
          <span class="text-muted text-sm">({playlist.songs.length})</span>
        </button>
      {/each}
    </div>
  </div>
</Modal>
