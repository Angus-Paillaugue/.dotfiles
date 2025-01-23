<script lang="ts">
  import { onMount } from 'svelte';
  import { getTheme, theme, type Themes } from './';

  function setTheme(value: Themes) {
    console.log('theme', value)
      document.documentElement.classList.toggle(
        'dark',
        value === 'dark'
      )
  }

  onMount(() => {
    setTheme(getTheme());
    theme.subscribe((value: Themes) => {
      setTheme(value);
    });
  });
</script>
