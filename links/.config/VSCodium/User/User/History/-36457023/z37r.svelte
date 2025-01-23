<script lang="ts">
  import Nav from './Nav.svelte';

  let { children } = $props();
</script>

<div class="flex min-h-svh flex-col">
  <Nav />

  {@render children?.()}
</div>
