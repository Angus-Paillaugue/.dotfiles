<script>
	import Toast from './Toast.svelte';
	import { toasts, toast } from './index.js';
	import { flip } from 'svelte/animate';

	toast.error({ message:'This is an error message', timeout: 5000 });
	toast.success({ message:'This is a success message', timeout: 6000 });
	toast.warning({ message:'This is a warning message', timeout: 7000 });
	toast.info({ message:'This is an info message', timeout: 8000 });
</script>

<div
	class="fixed max-md:left-1/2 md:right-2 z-30 flex w-full max-w-[300px] max-md:-translate-x-1/2 flex-col gap-2 bottom-2 md:z-50"
>
	{#each $toasts.slice(0, 4) as t (t.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast toast={t} />
		</div>
	{/each}
</div>
