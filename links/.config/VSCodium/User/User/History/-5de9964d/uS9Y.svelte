<script lang="ts">
	import Player from '$lib/songs/Player.svelte';
	import { type Song } from '$lib/types';

  let { data } = $props();
  let { songs } = data;

  let currentlyPlayingSong = $state<Song | null>(null);
</script>


<div class="h-svh flex flex-col">
  <div class="grow">
    <div class="flex flex-col">
      {#each songs as song}
        <button onclick={() => currentlyPlayingSong = song} class="flex flex-col items-start justify-start gap-2 p-4 w-full">
          <h3>{song.title}</h3>
          <p class="text-neutral-600">{song.artist}</p>
        </button>
      {/each}
    </div>
  </div>

  <Player bind:currentlyPlayingSong />
</div>
