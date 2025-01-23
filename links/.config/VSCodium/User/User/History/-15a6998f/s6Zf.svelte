<script>
	/**
	 * @typedef {Object} Props
	 * @property {any} color
	 * @property {number} [size]
	 * @property {any} link
	 * @property {any} tooltip
	 */

	/** @type {Props} */
	let {
		color,
		size = 20,
		link
	} = $props();

	color = color?.toLowerCase() ?? 'gray';

	const colorRegistry = {
		red: 'e94749',
		yellow: 'e7b30c',
		green: '22c55e',
		blue: '3b82f6',
		indigo: '6366f1',
		purple: 'a855f7',
		pink: 'eb4999',
		gray: '697585',
		white: 'ffffff',
		black: '000000',
		beige: 'd6b994',
		silver: 'a1a1aa',
		moss: '2a422f'
	};
</script>

{#if link}
	<a href="/items?color={color}" aria-label="{color} color circle indicator" class="rounded-full w-fit block">
		<div style="width:{size}px;height:{size}px;background-color:#{colorRegistry[color]};"></div>
	</a>
{:else}
	<div style="width:{size}px;height:{size}px;background-color:#{colorRegistry[color]};"></div>
{/if}
