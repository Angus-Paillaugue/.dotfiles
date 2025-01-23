<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';

  let paragraphs = $state([]);

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
    const pageContents = xmlDoc.querySelectorAll('.t-content__body p');
    paragraphs = Array.from(pageContents).map((p) => p.textContent);
  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });

  $inspect(paragraphs)
</script>
