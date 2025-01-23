<script>
  import { onMount } from 'svelte';
  import mermaid from 'mermaid'
  import { fade } from 'svelte/transition'

  let mermaidRendered = $state(false);
  const { height = 400, children } = $props();

  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  onMount(() => {
    mermaidRendered = true
    setTimeout(async () => {
      await mermaid.run()
    }, 0)
  });
</script>

<div class="container" style:height= { mermaidRendered ? null : `${height}px`}>
  {#if mermaidRendered}
  <pre in:fade={{ delay:1000, duration:300 }} class="mermaid" style:height={ `${height}px` }>
    {@render children()}
  </pre>
  {:else}
  <div out:fade={{ duration:300 }} class="placeholder" style:height={ `${height}px` }>
  Loading...
  </div>
  {/if}
</div>

<style>
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .placeholder {
    position: absolute;
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
