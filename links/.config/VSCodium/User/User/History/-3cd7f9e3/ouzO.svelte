<script lang="ts">
  import type { Snippet } from 'svelte';
  import Nav from './Nav.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Nav />

{@render children()}
