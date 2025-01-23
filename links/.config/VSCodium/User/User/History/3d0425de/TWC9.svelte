<script>
  import { onMount } from 'svelte';
  import { colors } from '$conf';
  import { setColor } from '$lib/utils';

  // Set the page primary color
	onMount(() => {
    const localStorageColor = localStorage.getItem('color-primary');
    if (localStorageColor) {
      setColor(localStorageColor)
    }else {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
    }
	});
</script>
