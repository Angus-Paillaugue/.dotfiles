<script>
	import '../app.css';
	import '../code.css';
	import { Toasts } from '$lib/components';

	const { children } = $props();
	/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
</script>

<Toasts />

{@render children()}
