<script lang="ts">
	import { X } from "lucide-svelte";
	import { fade, fly } from "svelte/transition";

  interface Props {
    open: boolean;
    children?: () => any;
  }
  let { open = $bindable(false), children }: Props = $props();
</script>

<svelte:window onkeydown={(e) => {if(e.key === "Escape"){open = false}}} />

{#if open}
<!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 bg-background/50 backdrop-blur-md z-50" transition:fade={{ duration: 300 }} onclick={() => (open = false)}></div>

  <div class="bg-background w-full max-w-screen-md border rounded-lg p-4 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed" transition:fly={{ duration: 300, y:'100%' }}>
    <div class="w-full relative">
      <button class="p-1 absolute top-2 right-2 rounded-md hover:bg-secondary" onclick={() => (open = false)}><X class="size-4" /></button>
      {@render children?.()}
    </div>
  </div>
{/if}
