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
  let numberOfPages = $derived(Math.ceil(songs.length / GRID_SIZE));
</script>

<div class={cn("w-full overflow-hidden", className)}>
  <div class='relative w-full flex gap-6 snap-x overflow-x-auto pb-14'>
    {#each new Array(numberOfPages) as _, pageNumber}
      <div class="grid grid-cols-3 grid-rows-2 w-full shrink-0">
        {#each songs.slice(pageNumber * GRID_SIZE, (pageNumber + 1) * GRID_SIZE) as song}
          <Track format="card" {song} />
        {/each}
      </div>
    {/each}
    <!-- <div class="grid grid-rows-1 overflow-hidden transition-transform duration-300" style:grid-template-columns="repeat({numberOfPages}, minmax(0, 1fr))" style:width="{numberOfPages * 100}%" style:transform="translateX(-{(100 / numberOfPages) * currentPage}%)">
    </div>

    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 flex-row">
      {#each new Array(numberOfPages) as _, pageNumber}
        <button class={cn("size-4 rounded-full transition-colors", pageNumber === currentPage ? 'bg-muted' : 'bg-secondary')} aria-label="Go to page {pageNumber}" disabled={pageNumber === currentPage} onclick={() => currentPage = pageNumber}> </button>
      {/each}
    </div> -->
  </div>
</div>
