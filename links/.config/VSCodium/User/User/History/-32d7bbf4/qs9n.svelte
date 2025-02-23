<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { cn } from '$lib/utils';

	const {
		children,
		content,
		position = 'top',
		class: className,
		delay = 0,
		...restProps
	} = $props();

	let isHovered = $state(false);
	let tooltipCoords = $state({ x: 0, y: 0, width: 0, height:0 });
	let tooltip = $state();
	let tooltipContent = $state();
	let delayTimeout = $state();

	/**
	 * Show the tooltip.
	 */
	const showTooltip = () => {
		if (!isHovered) {
			clearTimeout(delayTimeout);
			delayTimeout = setTimeout(() => {
				isHovered = true;
			}, delay);
		}
		const rect = tooltip.getBoundingClientRect();

		tooltipCoords = {
			x: rect.left + window.scrollX,
			y: rect.top + window.scrollY,
			width: rect.width,
			height: rect.height
		};
	};

	/**
	 * Hides the tooltip.
	 */
	const hideTooltip = () => {
		isHovered = false;
	};

	onMount(() => {
		tooltip.addEventListener('mouseenter', showTooltip);
		tooltip.addEventListener('mouseleave', hideTooltip);
		tooltip.addEventListener('focus', showTooltip);
		tooltip.addEventListener('blur', hideTooltip);

		window.addEventListener('scroll', hideTooltip);
		window.addEventListener('resize', hideTooltip);
		window.onmousemove = (e) => {
			if (isHovered && !tooltip.contains(e.target)) {
				hideTooltip();
			}
		};

		return () => {
			tooltip.removeEventListener('mouseenter', showTooltip);
			tooltip.removeEventListener('mouseleave', hideTooltip);
			tooltip.removeEventListener('focus', showTooltip);
			tooltip.removeEventListener('blur', hideTooltip);
		};
	});

	/**
	 * Retrieves the styles for the Tooltip component.
	 *
	 * @returns {Object} The styles object.
	 */
	const getStyles = () => {
		if (!tooltip) return;
		const parentRect = (tooltip?.offsetParent || document.body).getBoundingClientRect();

		const tooltipRect = tooltip.getBoundingClientRect();

		console.log(tooltipRect);
        const top = tooltipRect.top - parentRect.top;
        const left = tooltipRect.left - parentRect.left;

        if (position === 'top') {
            return `top: ${top}px; left: ${left + tooltipCoords.width / 2}px; transform: translate(-50%, -100%);`;
        } else if (position === 'bottom') {
            return `top: ${top + tooltipCoords.height}px; left: ${left + tooltipCoords.width / 2}px; transform: translate(-50%, 0);`;
        } else if (position === 'left') {
            return `top: ${top + tooltipCoords.height / 2}px; left: ${left}px; transform: translate(-100%, -50%);`;
        } else if (position === 'right') {
            return `top: ${top + tooltipCoords.height / 2}px; left: ${left + tooltipCoords.width}px; transform: translate(0, -50%);`;
        }
	};
	const positionClasses = {
		top: '-translate-y-full -translate-x-1/2',
		bottom: '-translate-x-1/2',
		left: '-translate-x-full -translate-y-1/2',
		right: '-translate-y-1/2'
	};

	// Animation of the tooltip
	const FLY_AMOUNT = 3;
	const flyOptions = {
		y: position === 'top' ? FLY_AMOUNT : position === 'bottom' ? -FLY_AMOUNT : 0,
		x: position === 'left' ? FLY_AMOUNT : position === 'right' ? -FLY_AMOUNT : 0,
		duration: 200,
		easing: backOut
	};
</script>

<div
	name="Open tooltip"
	aria-label="Open tooltip"
	class={cn(className)}
	{...restProps}
	bind:this={tooltip}
>
	{@render children()}
</div>

<!-- {#if isHovered} -->
	<div
		class={cn('fixed z-40 max-w-[250px] w-max p-2', positionClasses[position])}
		style={getStyles()}
		transition:fly={flyOptions}
		role="tooltip"
		bind:this={tooltipContent}
	>
		<div
			class="relative pointer-events-none rounded-lg gap-2 p-2 text-sm border border-neutral-700 bg-neutral-800 text-text-body-dark"
		>
			{@html content}
		</div>
	</div>
<!-- {/if} -->
