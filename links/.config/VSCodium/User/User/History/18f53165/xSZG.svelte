<script>
  import { fade } from 'svelte/transition'

  const { height = 400, children, mermaidRendered = $bindable(false) } = $props();
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
