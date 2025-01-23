<script lang="ts">
  let element = $state<HTMLDivElement | null>(null);
  let visible = $state<boolean>(false);

  $effect(() => {
    if(!e)
  })
</script>

{#if visible}
  <div bind:this={element}></div>
{/if}
