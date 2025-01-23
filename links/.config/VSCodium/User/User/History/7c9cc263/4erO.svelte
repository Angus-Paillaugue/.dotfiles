<script>
	import { toasts, toast } from './index.js';
	import Toast from './Toast.svelte';
</script>

<div
	class="fixed left-1/2 top-16 z-[51] flex w-full max-w-[300px] -translate-x-1/2 flex-col-reverse gap-2"
>
	{#each $toasts.slice(0, 4) as t (toast.id)}
		<Toast toast={t} animate:flip={{ duration: 500 }} />
	{/each}
</div>
