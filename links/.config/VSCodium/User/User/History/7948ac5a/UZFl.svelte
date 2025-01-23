<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-row">
	<aside>

	</aside>
	<main>
		{@render children?.()}
	</main>
</div>
