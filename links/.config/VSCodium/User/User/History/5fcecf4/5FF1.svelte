<script lang="ts">
	import { X } from "lucide-svelte";
	import { fade } from "svelte/transition";

  interface Props {
    open: boolean;
    children?: () => any;
  }
  let { open = $bindable(false), children }: Props = $props();
</script>

{#if open}
  <div class="fixed inset-0 bg-background/50 backdrop-blur-md z-50" transition:fade></div>

  <div class="fixed inset-0 flex justify-center items-center z-50" transition:fly>
    <div class="bg-background max-w-screen-md border w-full rounded-lg relative p-4">
      <button class="p-1 absolute top-2 right-2 rounded-md hover:bg-secondary"><X class="size-4" /></button>
      {@render children?.()}
    </div>
  </div>
{/if}
