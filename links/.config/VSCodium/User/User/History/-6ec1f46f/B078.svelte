<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
    const paragraphs = xmlDoc.getElementsByTagName('p');
    console.log(paragraphs);

  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });
</script>
