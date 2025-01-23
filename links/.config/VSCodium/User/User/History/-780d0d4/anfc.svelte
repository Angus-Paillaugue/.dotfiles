<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	import { pageMetadata } from "$lib/stores";

	let { children } = $props();
</script>

<svelte:head>
	
</svelte:head>

<ModeWatcher />
<Toaster />

{@render children?.()}
