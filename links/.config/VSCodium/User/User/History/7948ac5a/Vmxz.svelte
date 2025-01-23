<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-row">
	<aside class="shrink-0">

	</aside>
	<main class="grow">
		{@render children?.()}
	</main>
</div>
