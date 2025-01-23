<script>
	import { cn } from '$lib/utils';
	const { difficulty = 'easy', class: className } = $props();

	const difficultyClasses = {
		easy: 'bg-green-600 text-neutral-100',
		medium: 'bg-yellow-600 text-neutral-100',
		hard: 'bg-red-600 text-neutral-100'
	};
</script>

<span
	class={cn(
		difficultyClasses[difficulty],
		'block w-fit rounded-full px-2 py-1 text-sm font-semibold',
		className
	)}
>
	{difficulty}
</span>
