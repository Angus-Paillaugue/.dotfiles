<script>
	import { formatDate, generateFormattedText } from '$lib/utils';
	import { fade, fly } from 'svelte/transition';
	import { showNavbar, bionicReadingEnabled } from '$lib/stores';
	import { scale } from 'svelte/transition';
	import {
		BookmarkFill,
		BookmarkBorder,
		Share,
		Check,
		Close,
		ChevronsRight
	} from '$lib/components/icons';
	import { Spinner } from '$lib/components';
	import { PROXY_URL } from '$lib/constants';

	let loading = $state(true);
	let {
		url,
		visible = $bindable(false),
		color = $bindable(''),
		bookmarks = $bindable([]),
		provider = $bindable(''),
		onBookmarkChange,
		date,
		img,
		title,
		onclose
	} = $props();
	let article = $state({ title: '', paragraphs: [], date: '' });
	let shared = $state(false);
	let isBookmarking = $state(false);
	let fsImgModalProps = $state({ visible: false, src: '' });
	let isBookmarked = $state(false);

	// Check if the article is bookmarked
	$effect(() => {
		isBookmarked = bookmarks.some((b) => encodeURIComponent(b.url) === encodeURIComponent(url));
	});

	// Toggle navbar visibility when the article is opened
	$effect(() => {
		if (visible) {
			showNavbar.set(false);
		} else {
			showNavbar.set(true);
		}
	});

	// Fetch article contents when the article is opened
	$effect(async () => {
		if (!url || !visible) return;
		await fetchContents(url);
	});

	/**
	 * Asynchronously fetches the article contents from the given URL.
	 *
	 * @param {string} url - The URL from which to fetch contents.
	 * @returns {Promise<any>} A promise that resolves to the fetched contents.
	 */
	async function fetchContents(url) {
		loading = true;
		const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(url)}`);
		const xml = await response.json();

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xml.contents, 'text/html');
		const contentContainer = xmlDoc.querySelector(provider.articleContentContainerSelector);
		if (contentContainer) {
			const excludeSelectors = provider.articleContentExcludeSelector.split('||');
			const selectors = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'];
			const selector = selectors.map(element => {
					// Create :not() selectors for each exclusion
					const exclusions = excludeSelectors.map(modifier => `:not(${modifier} ${element})`).join('');
					return `${element}${exclusions}`;
			}).join(', ');
			console.log('document.querySelector("'+provider.articleContentContainerSelector+'").querySelectorAll("'+selector+'")');


			const pageContents = contentContainer.querySelectorAll(selector);
			article.paragraphs = Array.from(pageContents)
				.map((p) => {
					if (p.tagName === 'IMG')
						return { tag: p.tagName.toLowerCase(), content: p.getAttribute('src') };
					return { tag: p.tagName.toLowerCase(), content: p.textContent.trim() };
				})
				.filter((e) => e);
		}else {
			article.paragraphs = [{ tag: 'p', content: 'No content found' }];
		}
		article.title = title;
		article.date = new Date(date);
		article.img = img;
		loading = false;
	}

	/**
	 * Toggles the bookmark status of an article.
	 * This function is asynchronous and involve updating the bookmark status in the database.
	 */
	async function toggleBookmark() {
		isBookmarking = true;
		if (isBookmarked) {
			const res = await fetch('/api/removeBookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: bookmarks.find((b) => b.url === url).id })
			});
			if (res.ok) isBookmarked = false;
			isBookmarking = false;
			bookmarks = bookmarks.filter((b) => b.url !== url);
			if (onBookmarkChange) onBookmarkChange(bookmarks);
		} else {
			let newBookmark = {
				url,
				title: article.title,
				date: article.date,
				img: article.img,
				color: color,
				description: article?.paragraphs?.map((p) => p.content)?.join('\n') || 'No description'
			};
			const res = await fetch('/api/addBookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},

				body: JSON.stringify(newBookmark)
			});
			if (res.ok) isBookmarked = true;
			const insertId = await res.json();
			newBookmark.id = insertId;
			bookmarks.push(newBookmark);
			isBookmarking = false;
			if (onBookmarkChange) onBookmarkChange(bookmarks);
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			fsImgModalProps.visible = false;
		}
	}}
/>

{#if visible}
	<!-- Backdrop -->
	<div
		class="backdrop-blur-md fixed inset-0"
		style="z-index: 9999;"
		transition:fade={{ duration: 500 }}
	></div>

	<!-- Article card -->
	<div
		class="fixed inset-0 flex flex-col items-center justify-center md:p-4"
		style="z-index: 10000;"
		transition:fly={{ y: '100%', duration: 500 }}
	>
		<div
			class="flex flex-col items-start justify-start relative h-full w-full max-w-screen-md md:rounded-3xl"
			style="background-color: #{color};"
		>
			{#if loading}
				<div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
					<Spinner class="size-8" />
				</div>
			{:else}
				<!-- Action buttons -->
				<div class="p-4 md:p-6 flex w-full flex-row justify-between items-start">
					<!-- Close full-screen article -->
					<button
						onclick={() => {visible = false;onclose();}}
						class="rounded-full p-2 text-text-body"
						aria-label="Close"
						style="background-color: #{color}; filter: brightness(93%);"
					>
						<Close class="size-6" />
					</button>
					<!-- Right action buttons -->
					<div class="flex flex-row items-center gap-6">
						<!-- Toggle bionic reading -->
						<button
							class="rounded-full size-10 transition-colors"
							aria-label="Toggle bionic reading"
							style="background-color: #{$bionicReadingEnabled
								? '737373'
								: color}; filter: brightness(93%); color: #{$bionicReadingEnabled
								? color
								: '737373'};"
							onclick={() => {
								$bionicReadingEnabled = !$bionicReadingEnabled;
							}}
						>
							<h1 class="text-inherit text-xl font-bold transition-colors">Br</h1>
						</button>
						<!-- Share -->
						<button
							class="rounded-full p-2 text-text-body"
							aria-label="Share"
							style="background-color: #{color}; filter: brightness(93%);"
							onclick={() => {
								if ('share' in navigator) navigator.share({ url });
								else navigator.clipboard.writeText(url);
								shared = true;
								setTimeout(() => {
									shared = false;
								}, 1500);
							}}
						>
							{#if shared}
								<div in:scale>
									<Check class="size-6" />
								</div>
							{:else}
								<div in:scale>
									<Share class="size-6" />
								</div>
							{/if}
						</button>
						<!-- Toggle bookmark -->
						<button
							class="rounded-full p-2 text-text-body group"
							aria-label="Add to bookmarks"
							style="background-color: #{color}; filter: brightness(93%);"
							onclick={toggleBookmark}
						>
							{#if isBookmarking}
								<div in:scale>
									<Spinner class="size-6" />
								</div>
							{:else if isBookmarked}
								<div in:scale>
									<BookmarkFill class="size-6" />
								</div>
							{:else}
								<div in:scale>
									<BookmarkBorder class="size-6" />
								</div>
							{/if}
						</button>
					</div>
				</div>
				<div class="grow flex overflow-y-hidden flex-col p-6 pt-0">
					<div class="overflow-y-auto no-scrollbar grow rounded-3xl pb-20 md:pb-4">
						<!-- Main img -->
						<img src={article.img} class="w-full rounded-3xl" alt="" />
						<h1 class="leading-10 text-2xl md:text-3xl font-semibold text-text-heading my-4">
							{article.title}
						</h1>
						<time datetime={article.date}>{formatDate(article.date)}</time>
						<!-- Article contents -->
						{#each article?.paragraphs as p}
							{#if p.tag === 'p'}
								<p class="mt-4">
									{@html p.content.split(' ').map(generateFormattedText).join(' ')}
								</p>
							{:else if p.tag === 'h1'}
								<h1
									class="leading-8 md:leading-10 text-2xl md:text-3xl font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h1>
							{:else if p.tag === 'h2'}
								<h2
									class="leading-7 md:leading-9 text-xl md:text-2xl font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h2>
							{:else if p.tag === 'h3'}
								<h3
									class="leading-6 md:leading-8 text-lg md:text-xl font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h3>
							{:else if p.tag === 'h4'}
								<h4
									class="leading-5 md:leading-7 text-base md:text-lg font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h4>
							{:else if p.tag === 'h5'}
								<h5
									class="leading-4 md:leading-6 text-sm md:text-base font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h5>
							{:else if p.tag === 'h6'}
								<h6
									class="leading-3 md:leading-5 text-xs md:text-sm font-semibold text-text-heading mt-4"
								>
									{p.content}
								</h6>
							{:else if p.tag === 'img'}
								<button
									aria-label="Open img fullscreen"
									onclick={() => {
										fsImgModalProps.src = p.content;
										fsImgModalProps.visible = true;
									}}
								>
									<img src={p.content} class="w-max rounded-xl max-h-[500px]" alt="" />
								</button>
							{/if}
						{/each}
						<!-- Read original link -->
						<a
							href={url}
							target="_blank"
							class="flex flex-row items-center gap-2 text-text-body mt-4 underline underline-offset-2"
						>
							Read original
							<ChevronsRight class="size-5" />
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if fsImgModalProps.visible}
	<button
		style="z-index: 10001;"
		class="fixed inset-0"
		aria-label="Close full screen img"
		onclick={() => {
			fsImgModalProps.visible = false;
		}}
	>
		<div class="w-full h-full relative">
			<!-- Backdrop -->
			<div class="backdrop-blur-md fixed inset-0" transition:fade={{ duration: 500 }}></div>

			<!-- Article card -->
			<div
				class="fixed inset-0 flex flex-col items-center justify-center p-4"
				transition:scale={{ duration: 500 }}
			>
				<img
					src={fsImgModalProps.src}
					alt=""
					class="max-w-full max-h-full object-contain rounded-3xl"
				/>
			</div>
		</div>
	</button>
{/if}
