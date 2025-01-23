<script>
	import { Card, Spinner } from '$lib/components';
	import { fade, slide } from 'svelte/transition';
	import Exercise from './Exercise.svelte';
	import { toast } from '$lib/components/Toast';
	import { backOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import { goto } from "$app/navigation";

	const { data } = $props();
	const { paths } = data;

	const startedPaths = paths.filter((path) => path.solved_exercises > 0);
	const notStartedPaths = paths.filter((path) => path.solved_exercises === 0);

	let loadingPath = $state(null);
	let activePath = $state(null);

	async function fetchPath(id) {
		loadingPath = id;
    const res = await fetch(`/api/fetchPath`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });
		if (!res.ok) {
			toast.error({ message: 'Failed to fetch path. Please try again later.', timeout:3000 });
			loadingPath = null;
			return;
		}
    const data = await res.json();
    activePath = data.path;
		loadingPath = null;
		setSearchParam('path', activePath.id);
  }

	function setSearchParam(k, v) {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set(k, v);
		goto(`?${query.toString()}`);
	}

	function removeSearchParam(k) {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.delete(k);
		goto(`?${query.toString()}`);
	}

	function getSearchedParam(k) {
		let query = new URLSearchParams($page.url.searchParams.toString());
		return query.get(k);
	}

	// Handle search params
	$effect(() => {
		if(getSearchedParam('path') && !activePath) {
			fetchPath(getSearchedParam('path'));
		}
	});
</script>

<!-- SEO -->
<svelte:head>
	<!-- Normal tags -->
	<title>Learning paths | Skill-Forge</title>
	<meta
		property="description"
		content="On this page, you will find all the learning paths available on Skill-Forge."
	/>

	<!-- Open Graph tags -->
	<meta property="og:title" content="Learning paths | Skill-Forge" />
	<meta
		property="og:description"
		content="On this page, you will find all the learning paths available on Skill-Forge."
	/>

	<!-- Twitter / X tags -->
	<meta property="twitter:title" content="Learning paths | Skill-Forge" />
	<meta
		property="twitter:description"
		content="On this page, you will find all the learning paths available on Skill-Forge."
	/>
</svelte:head>

{#snippet card(path)}
	{@const solvedPercentage = (path.solved_exercises / path.total_exercises) * 100}
	<Card
		onclick={() => {
			fetchPath(path.id)
		}}
		onkeydown={(e) => {
			if (e.key === 'Enter') fetchPath(path.id)
		}}
		class="flex flex-col gap-2 transition-colors relative hover:bg-neutral-800 overflow-hidden"
		tabindex="0"
	>
		<h1 class="text-base font-bold md:text-2xl">
			{path.name}
		</h1>
		<p class="font-mono text-sm text-neutral-400">
			{path.description}
		</p>
		<!-- Progress indicators -->
		{#if path.solved_exercises > 0}
			<div class="flex flex-col gap-1">
				<!-- Progress bar -->
				<div class="progress-bar relative h-2 overflow-hidden rounded-full bg-neutral-700/50">
					<div class="h-full bg-neutral-100" style="width: {solvedPercentage}%;"></div>
				</div>
				<!-- Textual progress -->
				<div class="flex flex-row items-center justify-between">
					<span class="text-sm capitalize text-neutral-400">Total Progress</span>
					<div class="block">
						<span class="text-lg font-semibold text-neutral-100">{path.solved_exercises}</span>
						<span class="text-sm text-neutral-400">/{path.total_exercises}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if loadingPath === path.id}
			<div class="absolute inset-0 !m-0 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm" transition:fade={{ duration:200 }}>
				<Spinner class="size-10" />
			</div>
		{/if}
	</Card>
{/snippet}

<div class="flex w-full max-w-screen-lg mx-auto flex-col gap-2 mt-10">
	{#if startedPaths.length > 0}
		<h1 class="text-2xl font-bold capitalize">Continue Learning</h1>
		<div class="relative grid w-full gap-4 rounded-lg" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));">
			{#each startedPaths as path}
				{@render card(path)}
			{/each}
		</div>
	{/if}

	{#if notStartedPaths.length > 0}
		<h1 class="mt-10 text-2xl font-bold capitalize">Start Today</h1>
		<div class="relative grid w-full grid-cols-1 gap-4 rounded-lg lg:grid-cols-2 xl:grid-cols-3">
			{#each notStartedPaths as path}
				{@render card(path)}
			{/each}
		</div>
	{/if}
</div>

{#if activePath}
	<div class="inset-0 absolute bg-neutral-900/50 backdrop-blur-md z-30" transition:fade={{ duration:400 }}></div>
	<div class="border absolute bottom-0 left-0 right-0 z-40 max-h-full overflow-y-auto no-scrollbar border-neutral-700/50 border-b-0 rounded-t-xl w-full bg-neutral-900" transition:slide={{ axis:'y', duration:500, easing:backOut }}>
		<div class="max-w-screen-lg mx-auto w-full h-[90vh] md:h-[80vh]">
			<Exercise bind:path={activePath} />
		</div>
	</div>
{/if}
