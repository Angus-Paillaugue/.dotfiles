<script lang="ts">
	import { fade, fly } from "svelte/transition";

  let open = $state<boolean>(true);

  const TRANSITION_DURATION = 500;
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40" onclick={() => (open = false)} transition:fade={{ duration:TRANSITION_DURATION }}></div>

  <div class="fixed z-40 inset-0 p-2 flex flex-row justify-end pointer-events-none" transition:fly={{ duration:TRANSITION_DURATION, x:'100%' }}>
    <div class="h-full w-full max-w-[400px] bg-card border border-border rounded pointer-events-auto"></div>
  </div>
{/if}
