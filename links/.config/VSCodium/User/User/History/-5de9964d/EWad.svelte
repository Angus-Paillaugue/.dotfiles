<script lang="ts">
	import Track from '$lib/songs/Track.svelte';
	import type{ Song } from '$lib/types';
  import { currentlyPlayingSong } from '$lib/stores';

  let { data } = $props();

  let songs = $state<Song[]>(data.songs);
</script>


<div class="flex flex-col max-w-screen-lg w-full mx-auto p-2">
  {#each songs as song}
    <Track format="list" {song} isPlaying={$currentlyPlayingSong?.path === song.path} play={(s: Song) => ($currentlyPlayingSong = s)} />
  {/each}
</div>
