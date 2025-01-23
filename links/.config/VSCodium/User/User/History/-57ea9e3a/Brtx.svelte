<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import Toast from './Toast.svelte';
  import { toasts } from './toasts.js';
	import { Counter } from '$lib/components/counter';

	let count = $state(0);
	$effect(() => {
		count = $toasts.length - 1
	});
</script>

<div class="relative left-0 right-0 top-4 flex flex-row items-start justify-center">
	<div class="w-fit relative flex flex-col items-center justify-start">
    <Toast />
		{#if $toasts.length > 1}
			<div
				class="flex min-w-14 h-14 shrink-0 flex-row items-center justify-center rounded-full overflow-hidden absolute top-0 left-full ml-4 bg-black text-xl font-bold text-white md:h-14 shadow-lg"
				transition:scale={{ duration: 500, start: 0, easing: quintOut }}
			>
				+
				<div
					class="h-full w-8 flex flex-row items-center justify-center"
				>
					<Counter bind:value={count} lineHeight={20} />
				</div>
			</div>
		{/if}
	</div>
</div>
