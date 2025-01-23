<script>
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	const { children, class: className, ...restProps } = $props();
	let isDragging = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);
	let slider = $state(null);

	onMount(() => {
		if (!slider) return;
		slider.addEventListener('mousemove', handleMouseMove, false);
		slider.addEventListener('mousedown', handleMouseDown, false);
		slider.addEventListener('mouseup', handleMouseUp, false);
		slider.addEventListener('mouseleave', handleMouseUp, false);
	});

	function handleMouseDown(e) {
		isDragging = true;
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	}

	function handleMouseMove(e) {
		e.preventDefault();
		if (!isDragging) return;
		const x = e.pageX - slider.offsetLeft;
		const scroll = x - startX;
		slider.scrollLeft = scrollLeft - scroll;
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={cn(
		'flex flex-row items-center gap-8 flex-no-wrap overflow-x-auto no-scrollbar',
		className
	)}
	bind:this={slider}
	{...restProps}
>
	{@render children()}
</div>
