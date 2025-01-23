<script lang="ts">
  import Nav from './Nav.svelte';
  import { setMode } from '$lib/components/';

  let { children } = $props();

  setMode('light');
</script>

<Nav />

{@render children?.()}
