<script>
	import { ColorCircle } from '$lib/components';
	import { cn } from '$lib/utils';
	
	let { colors, link = true, size, class: className } = $props();
</script>

<div class={cn("flex flex-row gap-4", className)}>
	{#each colors as color}
		<ColorCircle {color} {link} {size} />
	{/each}
</div>
