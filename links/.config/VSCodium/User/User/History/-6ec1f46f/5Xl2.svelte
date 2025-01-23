<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { formatDate } from '$lib/utils';

  let article = $state({ title: '', paragraphs: [], date: '' });

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
    const pageContents = xmlDoc.querySelectorAll('.t-content__body p');
    const title = xmlDoc.querySelector('.t-content__title').textContent;
    const date = xmlDoc.querySelector('span.m-pub-dates__date:nth-child(2) > time:nth-child(1)').textContent;
    console.log(date);
    
    article.paragraphs = Array.from(pageContents).map((p) => p.textContent);
    article.title = title;
    article.date = new Date(date);
  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });

  $inspect(article)
</script>

<h1>{article.title}</h1>
<time datetime={article.date}>{formatDate(article.date)}</time>
{#each article.paragraphs as paragraph}
  <p>{paragraph}</p>
{/each}
