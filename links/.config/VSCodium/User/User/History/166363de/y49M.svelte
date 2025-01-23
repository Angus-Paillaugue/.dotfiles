<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-svh flex flex-col w-svw">
	{@render children()}
</div>
