<script lang="ts">
	import type { Song } from "$lib/types";
	import { cn } from "$lib/utils";
	import Track from "./Track.svelte";

  interface Props {
    songs: Song[];
    class?: string;
    rows?: number;
    cols?: number;
  }

  let { songs, class: className, rows = 2, cols = 3 }: Props = $props();
  const GRID_SIZE = rows * cols;
  let currantPage = $state(0);
  let numberOfPages = $derived(Math.ceil(songs.length / GRID_SIZE));

  function setCurrantPage(e: Scroll)
</script>

<div class={cn("w-full overflow-hidden", className)}>
  <div class='w-full flex flex-row relative overflow-x-auto snap-x no-scrollbar'>
    {#each new Array(numberOfPages) as _, pageNumber}
      <div class="grid grid-cols-3 grid-rows-2 w-full shrink-0 snap-start">
        {#each songs.slice(pageNumber * GRID_SIZE, (pageNumber + 1) * GRID_SIZE) as song}
          <Track format="card" {song} />
        {/each}
      </div>
    {/each}

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 flex-row">
      {#each new Array(numberOfPages) as _, pageNumber}
        <button class={cn("size-4 rounded-full transition-colors", pageNumber === currentPage ? 'bg-muted' : 'bg-secondary')} aria-label="Go to page {pageNumber}" disabled={pageNumber === currentPage} onclick={() => currentPage = pageNumber}> </button>
      {/each}
    </div>
  </div>
</div>
