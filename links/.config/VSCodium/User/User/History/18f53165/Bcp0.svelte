<script>
  import { onMount } from 'svelte';
  import { mermaidRendered } from '$lib/stores';
  import mermaid from 'mermaid'

  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  onMount(() => {
    mermaidRendered.set(true)
    setTimeout(async () => {
      await mermaid.run()
    }, 0)
  })
</script>
