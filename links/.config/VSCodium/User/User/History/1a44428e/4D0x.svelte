<script>
	import { ColorCircle } from '$lib/components';
	import { cn } from '$lib/utils';
	/**
	 * @typedef {Object} Props
	 * @property {any} colors
	 * @property {boolean} [link]
	 * @property {boolean} [tooltip]
	 */

	/** @type {Props} */
	let { colors, link = true, tooltip = true, class: className } = $props();
</script>

<div class={cn("flex flex-row gap-4", className)}>
	{#each colors as color}
		<ColorCircle {color} {link} {tooltip} />
	{/each}
</div>
