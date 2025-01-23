<script>
	import { cn } from '$lib/utils';
	const { difficulty = 'easy', class: className } = $props();

	const difficultyClasses = {
		easy: 'text-green-6 00',
		medium: 'text-yellow-6 00',
		hard: 'text-red-6 00'
	};
</script>

<span
	class={cn(
		difficultyClasses[difficulty],
		'inline-block text-sm font-bold',
		className
	)}
>
	{difficulty}
</span>
