<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import Nav from '../Nav.svelte';
  import { ModeWatcher } from 'mode-watcher';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
  const { hasARegisteredUser } = data;
</script>

<ModeWatcher />

<div class="flex min-h-svh flex-col">
  <Nav {hasARegisteredUser} />

  {@render children?.()}
</div>
