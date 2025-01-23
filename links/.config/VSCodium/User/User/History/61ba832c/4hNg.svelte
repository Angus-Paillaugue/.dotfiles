<script lang="ts">
	import { fade, fly } from "svelte/transition";

  let open = $state<boolean>(true);

  const TRANSITION_DURATION = 200;
</script>

{#if open}
  <div class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40" onclick={() => (open = false)} transition:fade={{ duration:TRANSITION_DURATION }}></div>

  <div class="fixed z-40 inset-0 p-2 flex flex-row justify-end pointer-events-none" transition:fly={{ duration:TRANSITION_DURATION }}>
    <div class="h-full w-full max-w-[400px] bg-card border border-border rounded pointer-events-auto"></div>
  </div>
{/if}
