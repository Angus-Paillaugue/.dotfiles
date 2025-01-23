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
    console.log(xmlDoc);
    const contentContainer = xmlDoc.querySelector('.t-content__body');
    const pageContents = contentContainer.querySelectorAll('p, h1, h2, h3, h4, h5, h6, img');
    const title = xmlDoc.querySelector('.t-content__title').textContent;
    const date = xmlDoc.querySelector('span.m-pub-dates__date:nth-child(2) > time:nth-child(1)').getAttribute('datetime');
    console.log(date);

    article.paragraphs = Array.from(pageContents).map((p) => {
      console.log(p);

      return { tag:p.tagName.toLowerCase() ,content:p.tagName === 'IMG' ? p.getAttribute('src') : p.textContent};
    });
    article.title = title;
    article.date = new Date(date);
    loading = false;
  }

  onMount(async() => {
    await fetchContents($page.url.searchParams.get('url'));
  });
</script>

<div class="p-4 pb-0 max-w-screen-md mx-auto">
  {#if loading}
    <p>Loading...</p>
  {:else}
    <h1 class="leading-8 lg:leading-10 text-2xl lg:text-3xl font-semibold text-text-heading-dark">{article.title}</h1>
    <time datetime={article.date} class="text-sm text-neutral-600">{formatDate(article.date)}</time>
    {#each article.paragraphs as p}
      {#if p.tag === 'p'}
        <p class="leading-6 text-text-body-dark mt-4">{p.content}</p>
      {:else if p.tag === 'h1'}
        <h1 class="leading-8 lg:leading-10 text-2xl lg:text-3xl font-semibold text-text-heading-dark mt-4">{p.content}</h1>
      {:else if p.tag === 'h2'}
        <h2 class="leading-7 lg:leading-9 text-xl lg:text-2xl font-semibold text-text-heading-dark mt-4">{p.content}</h2>
      {:else if p.tag === 'h3'}
        <h3 class="leading-6 lg:leading-8 text-lg lg:text-xl font-semibold text-text-heading-dark mt-4">{p.content}</h3>
      {:else if p.tag === 'h4'}
        <h4 class="leading-5 lg:leading-7 text-base lg:text-lg font-semibold text-text-heading-dark mt-4">{p.content}</h4>
      {:else if p.tag === 'h5'}
        <h5 class="leading-4 lg:leading-6 text-sm lg:text-base font-semibold text-text-heading-dark mt-4">{p.content}</h5>
      {:else if p.tag === 'h6'}
        <h6 class="leading-3 lg:leading-5 text-xs lg:text-sm font-semibold text-text-heading-dark mt-4">{p.content}</h6>
      {:else if p.tag === 'img'}
        <img src={p.content} class="w-full" alt="">
      {/if}
    {/each}
  {/if}
</div>
