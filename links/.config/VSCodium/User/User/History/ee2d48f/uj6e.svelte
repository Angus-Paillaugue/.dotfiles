<script>
  import { onMount } from 'svelte';
  import { theme } from './'

  onMount(() => {
    theme.subscribe((value) => {
      console.log('theme', value)
      document.documentElement.classList.toggle(
        'dark',
        value === 'dark'
      )
    });
  });
</script>
