<script>
	import { onMount } from 'svelte';
	import { Card, Spinner, Article } from '$lib/components';
	import { CARDS_COLORS, PROXY_URL } from '$lib/constants';
	import { CircleX, GridBorder, Swap } from '$lib/components/icons';
	import InterestPicker from './InterestPicker.svelte';
	import ChangeCategory from './ChangeCategory.svelte';
	import { Button, Dropdown } from '$lib/components';
	import { browser } from '$app/environment';

	const { data } = $props();
	const { allCategories } = data;
	const MAX_Z_INDEX = 9999;
	const CARD_ROTATION_FACTOR = 6;

	let items = $state([]);
	let bookmarks = $state(data.bookmarks || []);
	let categories = $state(data.categories || []);
	let fsArticleProps = $state({ visible: false, url: '', color: '' });
	let activeCategoryIndex = $state(0);
	let activeProviderIndex = $state(0);
	let isLoading = $state(false);
	let interestPickerVisible = $state(false);
	let error = $state(null);
	let swapCategoryModalVisible = $state(false);

	let currentCard = $state(null);
	let nextCard = $state(null);

	/**
	 * Asynchronously fetches data from a specified source.
	 *
	 * @returns {Promise<any>} A promise that resolves with the fetched data.
	 */
	async function fetchData() {
		if (!categories.length || !browser) return;
		items = [];
		isLoading = true;
		error = null;

		localStorage.setItem('activeCategoryIndex', activeCategoryIndex);
		localStorage.setItem('activeProviderIndex', activeProviderIndex);

		const provider = allCategories[activeProviderIndex];
		const category = provider.categories[activeCategoryIndex];

		try {
			const response = await fetch(`${PROXY_URL}/get?url=${encodeURIComponent(category.url)}`);
			const xml = await response.json();
			if (xml.status.http_code !== 200) error = 'An error occurred while fetching the news';

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(xml.contents, 'text/xml');
			const itemsElement = xmlDoc.getElementsByTagName('item');

			Array.from(itemsElement).forEach((item, index) => {
				try {
					const title = stripHtml(
						item.getElementsByTagName(provider.previewTitleSelector)[0]?.firstChild.nodeValue
					);
					const url = item.getElementsByTagName(provider.previewUrlSelector)[0]?.firstChild
						.nodeValue;
					const description = stripHtml(
						item.getElementsByTagName(provider.previewDescriptionSelector)[0]?.firstChild.nodeValue
					);
					const date = item.getElementsByTagName(provider.previewDateSelector)[0]?.firstChild
						.nodeValue;
					const img = item
						.getElementsByTagName(provider.previewImgSelector)[0]
						?.getAttribute('url');

					const bookmark = bookmarks.find((b) => b.url === url);

					items.push({
						title,
						url,
						description,
						date,
						img,
						color: bookmark?.color ?? CARDS_COLORS[index % CARDS_COLORS.length]
					});
				} catch (err) {
					console.error('ERROR: ' + err);
					error = err;
				}
			});
		} catch (err) {
			console.error('ERROR: ' + err);
			error = err;
		}

		isLoading = false;
		if (items.length > 0) {
			currentCard = items[0];
			nextCard = items[1] || null;
		} else {
			currentCard = null;
			nextCard = null;
		}
	}

	// Fetch news on mount
	onMount(async () => {
		activeCategoryIndex = parseInt(localStorage.getItem('activeCategoryIndex')) || 0;
		activeProviderIndex = parseInt(localStorage.getItem('activeProviderIndex')) || 0;
		await fetchData();
	});
	$effect(async () => {
		await fetchData();
	});

	/**
	 * Strips HTML tags from a given string.
	 *
	 * @param {string} html - The HTML string to be stripped of tags.
	 * @returns {string} - The plain text string with HTML tags removed.
	 */
	function stripHtml(html) {
		let tmp = document.createElement('DIV');
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || '';
	}

	/**
	 * Handles the touch start event of the swipeable cards.
	 *
	 * @param {Event} event - The touch start event object.
	 */
	function handleTouchStart(event) {
		const touch = (event?.touches && event?.touches[0]) ?? { clientX: event.clientX };
		currentCard.startX = touch.clientX;
		currentCard.currentX = touch.clientX;
	}

	/**
	 * Handles the touch move event of the swipeable cards.
	 *
	 * @param {TouchEvent} event - The touch move event object.
	 */
	function handleTouchMove(event) {
		if (!currentCard?.startX) return;

		const touch = (event?.touches && event?.touches[0]) ?? { clientX: event.clientX };
		currentCard.currentX = touch.clientX;
		const diffX = currentCard.currentX - currentCard.startX;
		const rotation = diffX / CARD_ROTATION_FACTOR;
		currentCard.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
	}

	/**
	 * Handles the touch end event of the swipeable cards.
	 *
	 * @param {Event} event - The touch end event object.
	 */
	function handleTouchEnd(event) {
		if (!currentCard?.startX) return;

		const diffX = currentCard.currentX - currentCard.startX;
		if (Math.abs(diffX) > event.target.closest('.articleSwipeCard').clientWidth / 4) {
			// If swipe right
			if (diffX > 0) {
				fsArticleProps.url = currentCard.url;
				fsArticleProps.visible = true;
				fsArticleProps.color = currentCard.color;
			}
			const endCardPos = window.innerWidth / 2 + 400;
			const endValue = diffX > 0 ? endCardPos : -endCardPos;
			const rotation = endValue / CARD_ROTATION_FACTOR;
			const duration = endCardPos / 2;
			currentCard.transitionDuration = duration;
			currentCard.transform = `translateX(${endValue}px) rotate(${rotation}deg)`;
			currentCard.opacity = 0;
			setTimeout(() => {
				if (items.length > 0) {
					items = items.slice(1);
					currentCard = items[0];
					nextCard = items[1] || null;
				} else {
					currentCard = null;
					nextCard = null;
				}
			}, duration);
		} else {
			const _INITIAL_TRANSITION_DURATION = currentCard.transitionDuration;
			currentCard.transitionDuration = 300;
			currentCard.transform = 'translateX(0) rotate(0)';
			setTimeout(() => {
				currentCard.transitionDuration = _INITIAL_TRANSITION_DURATION;
			}, currentCard.transitionDuration);
		}
		currentCard.startX = null;
	}
</script>

<svelte:head>
	<title>News</title>
</svelte:head>

<svelte:window onmousemove={handleTouchMove} />

<InterestPicker
	bind:visible={interestPickerVisible}
	bind:categories
	{allCategories}
	onchange={() => {
		activeCategoryIndex = 0;
		fetchData();
	}}
/>

<ChangeCategory
	bind:visible={swapCategoryModalVisible}
	bind:categories
	bind:activeCategoryIndex
	bind:activeProviderIndex
/>

<Article
	url={fsArticleProps.url}
	bind:bookmarks
	bind:color={fsArticleProps.color}
	bind:visible={fsArticleProps.visible}
	bind:provider={allCategories[activeProviderIndex]}
	title={currentCard?.title}
	date={currentCard?.date}
	img={currentCard?.img}
/>

<div class="h-full grow flex flex-col pb-[5.5rem] overflow-hidden">
	<!-- Heading -->
	<header class="shrink-0 p-4 max-w-md mx-auto w-full">
		<div class="flex flex-row justify-between items-center">
			<h1 class="text-xl font-extrabold">News</h1>
			<!-- Open categories modal button -->
			<Dropdown align="end">
				<Dropdown.Trigger class="rounded-full border border-neutral-500/50 p-1.5">
					<GridBorder class="size-6 text-text-heading-dark" />
				</Dropdown.Trigger>
				{#snippet items()}
					<Dropdown.Item
						onclick={() => {
							interestPickerVisible = true;
						}}>Categories</Dropdown.Item
					>
					<Dropdown.Item href="/app/dashboard">Account</Dropdown.Item>
				{/snippet}
			</Dropdown>
		</div>

		<hr class="my-4 border-neutral-800" />

		<div class="flex flex-row items-center gap-4">
			<h2 class="w-fit capitalize">
				<b>{categories[activeProviderIndex].name}</b> / {categories[activeProviderIndex].categories[
					activeCategoryIndex
				].label}
			</h2>

			<Button variant="ghost" class="size-8 p-0" onclick={() => (swapCategoryModalVisible = true)}>
				<Swap class="size-6 text-text-heading-dark" />
			</Button>
		</div>
	</header>

	<!-- Main content -->
	<div class="flex grow flex-col items-center justify-center relative">
		{#if isLoading}
			<!-- If is fetching news and parsing them -->
			<Spinner class="size-8" />
		{:else if items.length === 0}
			<!-- If there are no more news card to display -->
			<div
				class="px-6 max-w-md mx-auto py-4 rounded-3xl flex flex-col gap-4 text-text-heading items-center"
				style="background-color: #{CARDS_COLORS[0]};"
			>
				<h1 class="text-xl font-medium text-inherit">You reached the end !</h1>
				<Button
					onclick={() => {
						activeCategoryIndex = (activeCategoryIndex + 1) % categories.length;
					}}
				>
					Change category
				</Button>
			</div>
		{:else if currentCard}
			{#key currentCard.url}
				<!-- Display next card (for smoother transition) -->
				{#if nextCard}
					<div
						class="absolute top-0 left-4 right-4 bottom-4 mx-auto rounded-3xl overflow-hidden max-w-md max-h-[700px] transition-all"
					>
						<Card article={nextCard} />
					</div>
				{/if}
				<!-- Display current card -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="absolute top-0 left-4 right-4 bottom-4 mx-auto rounded-3xl overflow-hidden max-w-md max-h-[700px] transition-all articleSwipeCard"
					style="transform: {currentCard.transform || 'translateX(0) rotate(0)'}; transition-duration: {currentCard.transitionDuration ?? '75'}ms;"
					ontouchstart={handleTouchStart}
					ontouchmove={handleTouchMove}
					ontouchend={handleTouchEnd}
					onmousedown={handleTouchStart}
					onmouseup={handleTouchEnd}
					onmouseleave={handleTouchEnd}
				>
					<Card article={currentCard} />
				</div>
			{/key}
		{:else if error}
			<!-- If any error was thrown during the fetching process -->
			<div
				class="px-6 max-w-md mx-auto py-4 rounded-3xl flex flex-row gap-4 text-text-heading items-center"
				style="background-color: #{CARDS_COLORS[0]};"
			>
				<CircleX class="size-6 shrink-0 text-red-600" />
				<h1 class="text-xl font-medium text-inherit">{error}</h1>
			</div>
		{/if}
	</div>
</div>
