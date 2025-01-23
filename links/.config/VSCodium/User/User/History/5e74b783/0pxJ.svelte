<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<div class="flex flex-col min-h-svh w-full">
	{@render children()}
</div>
