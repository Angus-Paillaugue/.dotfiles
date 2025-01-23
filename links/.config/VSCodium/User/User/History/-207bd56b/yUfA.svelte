<script lang="ts">
	import type { Song } from "$lib/types";
	import { cn } from "$lib/utils";

  interface Props {
    songs: Song[];
    class?: string;
  }

  let { songs, class: className }: Props = $props();

  const baseClasses = 'grid grid-cols-1 gap-4';
  const mergedClasses = cn(baseClasses, className);
</script>
