<script>
	import Toast from './Toast.svelte';
	import { toasts, toast } from './index.js';
	import { flip } from 'svelte/animate';

	const toastsFns = [
		toast.error({ message:'This is an error message' }),
		toast.success({ message:'This is a success message' }),
		toast.warning({ message:'This is a warning message' }),
		toast.info({ message:'This is an info message' })
	]

	toastsFns.forEach((fn, i) => {
		setTimeout(() => fn(), i * 1000);
	});
</script>

<div
	class="fixed max-md:left-1/2 md:right-2 z-30 flex w-full max-w-[300px] max-md:-translate-x-1/2 flex-col gap-2 bottom-2 md:z-50 md:flex-col-reverse"
>
	{#each $toasts.slice(0, 4) as t (t.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast toast={t} />
		</div>
	{/each}
</div>
