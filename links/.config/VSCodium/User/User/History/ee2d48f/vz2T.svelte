<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  export let mode = writable('light');

  onMount(() => {
    const modeWatcher = window.matchMedia('(prefers-color-scheme: dark)');
    modeWatcher.addEventListener('change', (e) => {
      mode.set(e.matches ? 'dark' : 'light');
    });
  });
</script>
