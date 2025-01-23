<script>
	import { formatDate, generateFormattedText } from '$lib/utils';
	
  const  { article } = $props();
</script>

<article
	class="text-text-body absolute inset-4 rounded-3xl overflow-hidden max-w-md mx-auto max-h-[700px] transition-all"
	style="background-color: #{article.color};"
>
	<div class="relative w-full h-full p-4 lg:p-6 flex flex-col gap-4">
		<img src="{article.img}" alt="" class="h-1/3 min-h-36 w-full rounded-xl object-cover">
		<header>
			<h1 class="leading-8 lg:leading-10 text-2xl lg:text-3xl font-semibold text-text-heading line-clamp-[8]">{@html article.title}</h1>
		</header>
		<time datetime={article.date} class="text-sm text-neutral-600">{formatDate(article.date)}</time>
		<p class="leading-6 text-text-body line-clamp-4 lg:line-clamp-6">{@html article.description.split(' ').map(generateFormattedText).join(' ')}</p>
	</div>
</article>
