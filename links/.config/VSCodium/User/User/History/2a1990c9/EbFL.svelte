<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData, children: Snippet } = $props();

  let open = $state(false);
</script>

<Sidebar bind:open />

{@render children()}
