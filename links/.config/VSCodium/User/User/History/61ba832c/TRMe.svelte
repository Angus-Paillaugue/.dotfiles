<script lang="ts">
  let open = $state<boolean>(true);

  const TRANSITION_DURATION = 200;
</script>

{#if open}
  const TRANSITION_DURATION = 200;
  <div class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40" transition:fade={{ duration: }}></div>
{/if}
