<script lang="ts">
	import { fade } from "svelte/transition";

  let open = $state<boolean>(true);

  const TRANSITION_DURATION = 200;
</script>

{#if open}
  <div class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40" transition:fade={{ duration:TRANSITION_DURATION }}></div>

  .
{/if}
