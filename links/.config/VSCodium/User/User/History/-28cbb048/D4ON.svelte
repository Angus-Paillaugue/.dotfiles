<script>
	const { number = $bindable(0), lineHeight = 45 } = $props();
</script>

<div class="container" style="--line-height: {lineHeight}px; --offset: {-number * lineHeight}px">
	{#each Array(10) as _, i}
		<div class="digit" class:active={i==number}>{i}</div>
	{/each}
</div>

<style>
	.digit {
		transition: opacity 0.3s ease-in;
		opacity: 0.2;
	}
	.active {
		opacity: 1
	}
	.container {
		display: inline-flex;
		flex-direction: column;
		text-align: center;

		line-height: var(--line-height);
		height: var(--line-height);
		font-size: var(--line-height);
		transform: translate(0, var(--offset));

		/* https://easings.net/#easeInOutCirc */
		transition: transform 0.5s cubic-bezier(0.85, 0, 0.15, 1);
	}
</style>
