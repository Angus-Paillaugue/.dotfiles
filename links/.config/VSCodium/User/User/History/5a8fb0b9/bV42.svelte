<script lang="ts">
	import type { TextNote } from "$lib/types";

  interface Props {
    note: TextNote;
  }

  let { note }: Props = $props();

</script>

<textarea value={note.content} class="grow w-full h-full"></textarea>
