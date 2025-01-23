<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { artist } = data;

  console.log(artist)
</script>

<div class="mx-auto flex w-full max-w-screen-lg flex-col gap-4 mt-4">
  <h1 class="text-2xl font-bold">
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
