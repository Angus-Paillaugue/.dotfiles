<script>
  import { onMount } from 'svelte';
  import mermaid from 'mermaid'

  let mermaidRendered = $state(false);
  const { height = 400 } = $props();

  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  onMount(() => {
    mermaidRendered = true
    setTimeout(async () => {
      await mermaid.run()
    }, 0)
  });

<div class="container" style:height= { mermaidRendered ? null : `${height}px`}>
  {#if mermaidRendered}
  <pre in:fade={{ delay:1000, duration:300 }} class="mermaid" style:height={ `${height}px` }>
    <slot />
  </pre>
  {:else}
  <div out:fade={{ duration:300 }} class="placeholder" style:height={ `${height}px` }>
  Loading...
  </div>
  {/if}
</div>

<style lang="scss">
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
