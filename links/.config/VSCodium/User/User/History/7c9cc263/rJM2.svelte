<script>
  import Toast from './Toast.svelte';
	import { toasts, toast } from './index.js';
	import { flip } from 'svelte/animate';

	toast.error({ message: 'Error toast', timeout:false });
	toast.warning({ message: 'Warning toast', timeout:false });
	toast.success({ message: 'Success toast', timeout:false });
	toast.info({ message: 'Info toast' });
</script>

<div
	class="fixed left-1/2 max-md:bottom-2 md:top-2 z-30 md:z-50 flex w-full max-w-[300px] -translate-x-1/2 flex-col md:flex-col-reverse gap-2"
>
	{#each $toasts.slice(0, 4) as t (t.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast toast={t} />
		</div>
	{/each}
</div>
