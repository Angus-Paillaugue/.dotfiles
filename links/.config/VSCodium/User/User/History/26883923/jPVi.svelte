<script>
	import { page } from '$app/stores';
  import { onMount } from 'svelte';

	const tag = 'G-3PH7K1YNTX';

	onMount(() => {
		if (typeof gtag !== 'undefined') {
			gtag('config', tag, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	})
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id={tag}">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', tag);
	</script>
</svelte:head>
