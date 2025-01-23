<script>
  import { onMount } from 'svelte';
  import mermaid from 'mermaid'

  let mermaidRendered = $state(false);

  mermaid.initialize({ theme: 'neutral', startOnLoad: false })
  onMount(() => {
    mermaidRendered = true
    setTimeout(async () => {
      await mermaid.run()
    }, 0)
  })
</script>
