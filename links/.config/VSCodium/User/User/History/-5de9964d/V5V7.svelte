<script lang="ts">
	import Player from '$lib/songs/Player/Player.svelte';
	import Track from '$lib/songs/Track.svelte';
	import { type Song } from '$lib/types';

  let { data } = $props();
  let { songs } = data;

  let currentlyPlayingSong = $state<Song | null>(null);
</script>


<div class="h-svh flex flex-col">
  <div class="grow">
    <div class="flex flex-col max-w-screen-lg mx-auto p-2">
      {#each songs as song}
        <Track {song} isPlaying={currentlyPlayingSong?.path === song.path} play={(s: Song) => (currentlyPlayingSong = song)} />
      {/each}
    </div>
  </div>

  <Player bind:currentlyPlayingSong {songs} />
</div>
