<script lang="ts">
	import type { TextNote } from "$lib/types";
	import { onMount } from "svelte";

  interface Props {
    note: TextNote;
  }

  let { note = $bindable() }: Props = $props();

  let textarea = $state<HTMLTextAreaElement>();

  onMount(() => {
    textarea?.focus();
  })
</script>

<textarea bind:this={textarea} value={note.content} class="grow w-full h-full bg-background text-foreground focus:outline-none outline-none resize-none"></textarea>
