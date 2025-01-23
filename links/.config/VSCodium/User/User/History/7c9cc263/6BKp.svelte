<script>
  import Toast from './Toast.svelte';
	import { toasts } from './index.js';
	import { flip } from 'svelte/animate';
</script>

<div
	class="fixed left-1/2 top-16 z-[51] flex w-full max-w-[300px] -translate-x-1/2 flex-col-reverse gap-2"
>
	{#each $toasts.slice(0, 4) as t (t.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast toast={t} />
		</div>
	{/each}
</div>
