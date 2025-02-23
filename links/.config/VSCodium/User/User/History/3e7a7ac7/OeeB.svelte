<script>
	import { TestTubeDiagonal, CircleCheckBig, Circle, Play } from 'lucide-svelte';
	import { stripMD, urlHealer } from '$lib/utils';
	import { CircularProgress, Difficulty } from '$lib/components';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { path } = data;

	let noExercisesCompleted = $state(0);

	onMount(() => {
		noExercisesCompleted = path.exercises
			.map((e) => e.is_completed)
			.reduce((acc, cur) => acc + cur, 0);
	});
</script>

<svelte:head>
	<title>{path.name}</title>
</svelte:head>

<div class="w-full h-[200px] relative overflow-hidden">
	<div class="absolute inset-0">
		<div class="absolute left-1/2 top-1/2 h-[300px] w-[1020px] -translate-x-1/2 -translate-y-3/4 rounded-[100%] opacity-70 blur-[60px] bg-yellow-600"></div>
		<div class="absolute inset-0 opacity-10 bg-[linear-gradient(to_top,#FFF_0%,transparent_5%),linear-gradient(to_left,#FFF_0%,transparent_5%)]" style="background-size:20px 20px"></div>
		<div class="absolute bottom-0 left-0 h-[80px] w-full bg-[linear-gradient(rgba(0,0,0,0),#1A1A1A)]"></div>
	</div>
	<div class="max-w-screen-xl py-10 mx-auto h-full relative flex flex-col items-center justify-between">
		<h1 class="text-4xl font-bold text-neutral-100">{path.name}</h1>
		<p class="font-mono text-neutral-400">{path.description}</p>
		<button class="bg-neutral-100 px-4 py-1 rounded-full text-neutral-900 flex flex-row gap-1 font-medium text-base items-center">
			<Play class='fill-inherit size-5' />
			Start
		</button>
	</div>
</div>

<div class="mx-auto flex w-full max-w-screen-xl flex-col gap-10 p-4 md:gap-8">
	<div class="flex flex-col gap-4 rounded-xl bg-neutral-800 p-6 px-7">
		<h1 class="text-4xl font-bold text-neutral-100">{path.name}</h1>
		<p class="font-mono text-neutral-400">{path.description}</p>
	</div>

	<div class="overflow-hidden rounded-xl border border-neutral-700">
		<div class="flex flex-row items-center gap-4 bg-neutral-800 p-6 px-7">
			<TestTubeDiagonal class="size-6" />
			<div class="flex flex-col space-y-1.5">
				<h3 class="text-lg font-semibold leading-none tracking-tight">Exercises</h3>
				<p class="text-sm text-neutral-400">Exercises in this learning path.</p>
			</div>
			<div class="ml-auto flex flex-col gap-2">
				<CircularProgress
					class="size-12 md:size-16"
					min={0}
					max={path.exercises.length}
					bind:value={noExercisesCompleted}
					gaugePrimaryColor="rgb(22 163 74)"
					gaugeSecondaryColor="rgb(64 64 64 / 0.2)"
				/>
			</div>
		</div>

		{#if path.exercises.length === 0}
			<div class="w-full rounded-lg p-4">
				<h2 class="text-base font-medium">There are no exercises in this learning path yet!</h2>
			</div>
		{:else}
			{#each path.exercises as exercise}
				<a
					href="/app/exercises/{urlHealer.identifier.join(exercise.slug, exercise.id)}"
					class="flex w-full flex-row items-center border-b border-neutral-700 p-4 text-neutral-100 transition-colors last:border-none hover:bg-neutral-700/50"
				>
					{#if exercise.is_completed}
						<CircleCheckBig class="size-5 shrink-0 text-neutral-500" />
					{:else}
						<Circle class="size-5 shrink-0 text-neutral-500" />
					{/if}
					<div class="item-center relative flex grow flex-row justify-between px-4">
						<h3 class="font-base text-base">{exercise.title}</h3>
						<Difficulty difficulty={exercise.difficulty} />
					</div>
				</a>
			{/each}
		{/if}
	</div>
</div>
