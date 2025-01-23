<script>
	import { cn } from '$lib/utils';
	const { difficulty = 'easy', class: className } = $props();

	const difficultyClasses = {
		easy: 'text-green-600',
		medium: 'text-yellow-600',
		hard: 'text-red-600'
	};
</script>

<span
	class={cn(
		difficultyClasses[difficulty],
		'block w-fit rounded-full px-2 py-1 text-sm font-bold',
		className
	)}
>
	{difficulty}
</span>
