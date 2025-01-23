<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './';

  function setTheme(value: 'dark' | 'light') {
    console.log('theme', value)
      document.documentElement.classList.toggle(
        'dark',
        value === 'dark'
      )
  }

  onMount(() => {

    theme.subscribe((value: 'light' | 'dark') => {
      setTheme(value);
    });
  });
</script>
