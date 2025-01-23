<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';

  let article = $state({ title: '', paragraphs: [] });

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
    const pageContents = xmlDoc.querySelectorAll('.t-content__body p');
    const title = xmlDoc.querySelector('.t-content__title').textContent;
    article.paragraphs = Array.from(pageContents).map((p) => p.textContent);
    article.title = title;
  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });

  $inspect(article)
</script>

<h1>{article.title}</h1>
{#each article.paragraphs as paragraph}
  <p>{paragraph}</p>
{/each}
