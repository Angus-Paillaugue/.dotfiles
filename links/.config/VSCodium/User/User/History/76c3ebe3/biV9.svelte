<script lang="ts">
	import type { Song } from "$lib/types";

  interface Props {
    open: boolean;
    song: Song;
  }

  let { open = $bindable(false), song }: Props = $props();
</script>
