<script lang="ts">
  import { onMount } from 'svelte';
  import { getTheme, theme, type Themes } from './';

  function setTheme(value: Themes) {
    document.documentElement.classList.toggle(
      'dark',
      value === 'dark'
    )
  }

  onMount(() => {
    setTheme(getTheme());
    console.log('Initial theme', getTheme());
    theme.subscribe((value: Themes) => {
      setTheme(value);
    });
  });
</script>
