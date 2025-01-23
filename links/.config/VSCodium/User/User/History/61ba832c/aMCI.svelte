<script lang="ts">
	import { onMount } from "svelte";
	import { backInOut } from "svelte/easing";
	import { fade, fly } from "svelte/transition";

  let open = $state<boolean>(false);

  const TRANSITION_DURATION = 400;

  onMount(() => {
    setTimeout(() => {
      open = true
    }, 1000)
  })
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div aria-label="Close sidebar" class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40" onclick={() => (open = false)} transition:fade={{ duration:TRANSITION_DURATION }}></div>

  <div class="fixed z-40 inset-0 p-2 flex flex-row justify-end pointer-events-none">
    <div class="h-full w-full max-w-[400px] bg-card border border-border rounded-lg pointer-events-auto p-2 flex flex-col" transition:fly={{ duration:TRANSITION_DURATION, x:'100%', easing: backInOut }}>
      <!-- Header -->
      <div class="flex flex-row items-center justify-between shrink-0">
        <Button variant="icon" aria-label="Close sidebar" onclick={() => (open = false)} class="rounded hover:bg-border transition-colors bg-card flex flex-col items-center justify-center size-8">X</Button>
      </div>

      <!-- Body -->
      <div class="flex flex-col grow w-full">

      </div>
    </div>
  </div>
{/if}
