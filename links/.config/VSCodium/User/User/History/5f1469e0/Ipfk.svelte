<script>
	import { Difficulty, Button } from '$lib/components';
	import { cn, formatDate, formatBytes } from '$lib/utils';
	import { FlaskConical, BookOpen, CircleCheckBig } from 'lucide-svelte';
	import * as m from '$msgs';

	let {
		exercise,
		loadSubmission,
		submissions = $bindable(),
		leftPaneActiveIndex = $bindable()
	} = $props();
</script>

<div class="flex grow flex-col justify-center overflow-hidden rounded-xl bg-neutral-900">
	<!-- Tab selection buttons -->
	<div class="flex h-10 shrink-0 flex-row flex-nowrap overflow-x-auto bg-neutral-800 p-1">
		<Button
			variant="secondaryInverted"
			class={cn(
				'shrink-0',
				leftPaneActiveIndex === 0 ? 'hover:bg-neutral-800' : 'text-neutral-400'
			)}
			onclick={() => (leftPaneActiveIndex = 0)}
		>
			<BookOpen class="size-5" />
			{m.app_exercise_left_pane_description_tab()}
		</Button>
		<Button
			variant="secondaryInverted"
			class={cn(
				'shrink-0',
				leftPaneActiveIndex === 1 ? 'hover:bg-neutral-800' : 'text-neutral-400'
			)}
			onclick={() => (leftPaneActiveIndex = 1)}
		>
			<FlaskConical class="size-5" />
			{m.app_exercise_left_pane_solutions_tab()}
		</Button>
	</div>
	<!-- Exercise infos (title, description) -->
	<div class={cn('grow overflow-y-auto', leftPaneActiveIndex === 0 && 'p-4')}>
		<!-- Exercise description -->
		{#if leftPaneActiveIndex === 0}
			{#if exercise?.submissions?.length > 0}
				<div
					class="mb-4 flex w-fit flex-row items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-base font-medium"
				>
					{m.app_exercise_left_pane_has_been_solved()}
					<CircleCheckBig class="size-5 text-green-600" />
				</div>
			{/if}
			<Difficulty difficulty={exercise.difficulty} />
			<h1 class="text-3xl font-medium leading-[3.5rem] md:font-semibold md:leading-[4rem]">
				{exercise.title}
			</h1>
			<div id="pageContainer">
				{@html exercise.description}
			</div>
		{:else if leftPaneActiveIndex === 1}
			<!-- User submitted solutions -->
			<div class="relative w-full overflow-x-auto">
				{#if submissions.length === 0}
					<div class="mx-4 mt-10 grow rounded-lg bg-neutral-800 p-4">
						<h2 class="text-base font-medium">
							{m.app_exercise_left_pane_solutions_tab_no_solutions()}
						</h2>
					</div>
				{:else}
					<table class="w-full table-auto text-left text-sm text-neutral-400 rtl:text-right">
						<thead class="text-xs uppercase text-neutral-400">
							<tr>
								<th scope="col" class="px-6 py-3">
									{m.app_exercise_left_pane_solutions_tab_table_col_code()}
								</th>
								<th scope="col" class="px-6 py-3">
									{m.app_exercise_left_pane_solutions_tab_table_col_date()}
								</th>
								{#if !submissions.every((s) => s.ram_usage === null)}
									<th scope="col" class="px-6 py-3">
										{m.app_exercise_left_pane_solutions_tab_table_col_ram_usage()}
									</th>
								{/if}
							</tr>
						</thead>
						<tbody>
							{#key submissions}
								{#each submissions as submission}
									<tr
										class="border-b border-neutral-800 odd:bg-neutral-800/50 even:bg-neutral-900"
										onclick={() => {
											loadSubmission(submission);
										}}
									>
										<td class="px-6 py-4">
											<p class="line-clamp-3 whitespace-pre-wrap font-mono text-sm">
												{submission.submission}
											</p>
										</td>
										<td class="px-6 py-4">
											{formatDate(submission.completed_at)}
										</td>
										{#if !submissions.every((s) => s.ram_usage === null)}
											<td class="px-6 py-4">
												{formatBytes(submission.ram_usage)}
											</td>
										{/if}
									</tr>
								{/each}
							{/key}
						</tbody>
					</table>
				{/if}
			</div>
		{/if}
	</div>
</div>
