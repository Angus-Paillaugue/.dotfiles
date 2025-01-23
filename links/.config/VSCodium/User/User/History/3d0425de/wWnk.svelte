<script>
  import { onMount } from 'svelte';
  import { colors } from '$conf';

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

  export function setColor(color) {
    document.documentElement.style.setProperty('--color-primary', color);
    localStorage.setItem('color-primary', color);
  }
</script>
