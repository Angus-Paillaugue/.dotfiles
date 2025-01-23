<script>
	import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { formatDate } from '$lib/utils';

  let loading = $state(true)
  let article = $state({ title: '', paragraphs: [], date: '' });

  const PROXY_URL = 'http://localhost:1458';
  async function fetchContents(url) {
    loading = true;
    const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
    const xml = await response.json();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
    const pageContents = xmlDoc.querySelectorAll('.t-content__body p');
    const title = xmlDoc.querySelector('.t-content__title').textContent;
    const date = xmlDoc.querySelector('span.m-pub-dates__date:nth-child(2) > time:nth-child(1)').getAttribute('datetime');
    console.log(date);

    article.paragraphs = Array.from(pageContents).map((p) => p.textContent);
    article.title = title;
    article.date = new Date(date);
    loading = false;
  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <h1 class="leading-8 lg:leading-10 text-2xl lg:text-3xl font-semibold text-text-heading-dark">{article.title}</h1>
  <time datetime={article.date} class="text-sm text-neutral-600">{formatDate(article.date)}</time>
  {#each article.paragraphs as paragraph}
    <p class="leading-6 text-text-body-dark mt-4">{paragraph}</p>
  {/each}
{/if}
