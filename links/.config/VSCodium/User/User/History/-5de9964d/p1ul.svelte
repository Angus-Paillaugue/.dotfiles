<script lang="ts">
	import Track from '$lib/songs/Track.svelte';
	import { Song } from '$lib/types.js';
  let { data } = $props();
  let songs = $state<Song[]>(data.songs);
</script>


<div class="flex flex-col max-w-screen-lg mx-auto p-2">
  {#each songs as song}
    <Track {song} isPlaying={$currentlyPlayingSong?.path === song.path} play={(s: Song) => ($currentlyPlayingSong = s)} />
  {/each}
</div>
