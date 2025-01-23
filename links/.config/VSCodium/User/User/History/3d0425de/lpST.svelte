<script>
  import { onMount } from 'svelte';
  import { colors } from '$conf';

  // Set the page primary color
	onMount(() => {
		let color = colors[Math.floor(Math.random() * colors.length)];
		document.documentElement.style.setProperty('--color-primary', color);
	});
</script>
