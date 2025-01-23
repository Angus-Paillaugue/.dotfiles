<script lang="ts">
  let open = $state<boolean>(true);
</script>

{#if open}
  <div class="fixed inset-0 backdrop-blur-sm bg-background/50 z-40"></div>
{/if}
