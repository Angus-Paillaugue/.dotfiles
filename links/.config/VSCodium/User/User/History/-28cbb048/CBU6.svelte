<script>
	const { number = $bindable(0), lineHeight = 45 } = $props();
</script>

<div class="container inline-flex flex-col text-center transition-transform duration-500 ease-in-out" style="--line-height: {lineHeight}px; --offset: {-number * lineHeight}px">
	{#each Array(10) as _, i}
		<div class="transition-opacity duration-300" class:opacity-100={i==number}>{i}</div>
	{/each}
</div>

<style>
	.container {
		line-height: var(--line-height);
		height: var(--line-height);
		font-size: var(--line-height);
		transform: translate(0, var(--offset));
	}
</style>
