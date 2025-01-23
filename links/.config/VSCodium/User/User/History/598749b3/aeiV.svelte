<script lang="ts">
	import Track from '$lib/songs/Track/Track.svelte';
	import { songsToPlay } from '$lib/stores';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { artist } = data;

	$songsToPlay = artist.songs;
</script>

<!-- <div class="w-full h-full max-h-[40dvh] relative bg-center flex flex-col item-center justify-end bg-cover bg-no-repeat rounded-xl overflow-hidden py-4 px-2" style="background-image: url({artist.profilePicturePath});">

  <div class="absolute h-2/3 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background"></div>


  <div class="flex flex-col w-full mx-auto max-w-screen-lg mt-auto z-10">
  </div>
</div> -->

<div class="mx-auto flex w-full max-w-screen-lg flex-col gap-4 mt-4">
  <h1 class="text-4xl font-bold">
    {artist.name}
  </h1>
	<div class="flex flex-col p-2">
		{#each artist.songs as song}
			<Track format="list" {song} />
		{:else}
			<div class="flex flex-col gap-2 items-center justify-center">
				<p class="text-3xl font-medium">No songs found</p>
			</div>
		{/each}
	</div>
</div>
