<script>
	import { onMount } from "svelte";

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/xml');
  }

  onMount(async() => {
    await fetchContents('https://www.france24.com/fr/france/rss');
  });
</script>
