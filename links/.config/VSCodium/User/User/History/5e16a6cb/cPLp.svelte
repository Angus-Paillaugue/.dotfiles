<script>
	import { TestTubeDiagonal, CircleCheckBig, Circle, Play, ChevronLeft } from 'lucide-svelte';
	import { urlHealer } from '$lib/utils';
	import { CircularProgress, Difficulty, Tooltip, Spinner } from '$lib/components';
	import * as m from "$msgs"

	let { path = $bindable(), closePreview } = $props();

	let noExercisesCompleted = $state(0);
	let firstExercise = $state();

	$effect(() => {
		noExercisesCompleted = path.exercises
			.map((e) => e.is_completed)
			.reduce((acc, cur) => acc + cur, 0);
		firstExercise = path.exercises.find((e) => !e.is_completed);
	});
</script>

<div class="relative h-[250px] w-full overflow-hidden">
	<div class="absolute inset-0 [mask-image:radial-gradient(circle,#FFFFFF_0%,rgba(0,0,0,0))]">
		<div
			class="absolute left-1/2 top-1/2 h-full w-full max-w-screen-md -translate-x-1/2 -translate-y-3/4 rounded-[100%] bg-yellow-500/20 opacity-70 blur-[60px]"
		></div>
		<div
			class="absolute inset-0 bg-[linear-gradient(to_top,#FFF_0%,transparent_5%),linear-gradient(to_left,#FFF_0%,transparent_5%)] opacity-10"
			style="background-size:20px 20px"
		></div>
	</div>
	<div
		class="relative mx-auto flex h-full max-w-screen-lg flex-col items-center gap-8 px-4 py-10"
	>
		<!-- Go back button -->
		<Tooltip class="absolute left-4 top-10" content={m.app_learning_paths_modal_close()}>
			<button
				onclick={closePreview}
				aria-label={m.app_learning_paths_modal_close_label()}
				class="block rounded bg-neutral-300/10 p-1 text-neutral-300 transition-colors hover:bg-neutral-300/15"
			>
				<ChevronLeft class="size-6 stroke-[1.5]" />
			</button>
		</Tooltip>
		<h1 class="text-4xl font-bold text-neutral-100">{path.name}</h1>
		<p class="font-mono text-neutral-400">{path.description}</p>

		<!-- Start button -->
		{#if firstExercise}
			<a
				href="/app/exercises/{urlHealer.identifier.join(firstExercise.slug, firstExercise.id)}"
				class="flex flex-row items-center gap-1 rounded-full bg-neutral-100 px-4 py-1 text-base font-medium text-neutral-900"
			>
				<Play class="size-5 fill-inherit" />
				Start
			</a>
		{/if}
	</div>
</div>

<div class="mx-auto flex w-full max-w-screen-lg flex-col gap-10 p-4 md:gap-8">
	<div class="overflow-hidden rounded-xl border border-neutral-700">
		<div class="flex flex-row items-center gap-4 bg-neutral-800 p-6 px-7">
			<TestTubeDiagonal class="size-6" />
			<div class="flex flex-col space-y-1.5">
				<h3 class="text-lg font-semibold leading-none tracking-tight">{m.app_learning_paths_modal_exercise_title()}</h3>
				<p class="text-sm text-neutral-400">{m.app_learning_paths_modal_exercise_subtitle()}</p>
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
				<h2 class="text-base font-medium">{m.app_learning_paths_modal_exercise_no_exercises_in_path()}</h2>
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
