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
  let tooltipCoords = $state({ x: 0, y: 0, width: 0 });
  let tooltip = $state();
  let tooltipContent = $state();
  let delayTimeout = $state();

  /**
   * Show the tooltip.
   */
  const showTooltip = () => {
    if(!isHovered) {
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
    if (position === 'top') {
      return `top: ${tooltipCoords.y}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === 'bottom') {
      return `top: ${tooltipCoords.y + tooltipCoords.height}px; left: ${tooltipCoords.x + tooltipCoords.width / 2}px;`;
    } else if (position === 'left') {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x}px;`;
    } else if (position === 'right') {
      return `top: ${tooltipCoords.y + tooltipCoords.height / 2}px; left: ${tooltipCoords.x + tooltipCoords.width}px;`;
    }
  };
  const positionClasses = {
    top: '-translate-y-full -translate-x-1/2',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2'
  };
  // Positioning of the tooltip arrow
  const arrowPositionClasses = {
    top: 'left-1/2 bottom-2 -translate-x-1/2 translate-y-full',
    bottom: 'left-1/2 top-2 -translate-x-1/2 -translate-y-full rotate-180',
    left: 'right-2 translate-x-full top-1/2 -translate-y-1/2 -rotate-90',
    right: 'left-2 -translate-x-full top-1/2 -translate-y-1/2 rotate-90'
  };

  // Animation of the tooltip
  const flyOptions = {
    y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0,
    x: position === 'left' ? 10 : position === 'right' ? -10 : 0,
    duration: 200,
    easing: backOut
  };
</script>

<div
  name="Open tooltip"
  aria-label="Open tooltip"
  class={cn(
    className
  )}
  {...restProps}
  bind:this={tooltip}
>
  {@render children()}
</div>

{#if isHovered}
  <div
    class={cn(
      'absolute z-40 max-w-[250px] p-2',
      positionClasses[position]
    )}
    style={getStyles()}
    transition:fly={flyOptions}
    role="tooltip"
    bind:this={tooltipContent}
  >
    <div
      class="relative rounded-lg gap-2 p-2 text-xs border border-neutral-700 bg-neutral-800 text-text-body-dark"
    >
      {@html content}
    </div>
  </div>
{/if}
