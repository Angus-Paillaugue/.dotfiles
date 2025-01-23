<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import Toast from './Toast.svelte';
  import { toasts } from './toasts.js';

	let count = $derived($toasts.length - 1);
	const noOverflowingToasts = spring();
	let offset = $state(modulo($noOverflowingToasts, 1));
	$effect(() => {
		noOverflowingToasts.set(count);
	});
	$effect(() => {
		offset = modulo($noOverflowingToasts, 1);
	});
	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	// Toast management functions
	const generateId = () => Date.now().toString() + Math.floor(Math.random() * 10000).toString();
	function addToast() {
		const newToast = {
			id: generateId(),
			type: 'error',
			title: 'Toast title',
			message:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, voluptates? Saepe cumque quas, iusto eligendi tempora error architecto earum beatae fuga pariatur eaque sint quaerat? Reprehenderit commodi ullam quo molestiae.',
			hover: false
		};
		$toasts.push(newToast);
		// setTimeout(() => {
		// 	removeToast(newToast.id);
		// }, 5000);
	}
	function removeToast(id) {
		$toasts = $toasts.filter((toast) => toast.id !== id);
	}

	// Adding toasts on mount
	onMount(() => {
		addToast();
		setTimeout(() => {
			addToast();
		}, 1000);
		setTimeout(() => {
			addToast();
		}, 2000);
	});
</script>

<div class="relative left-0 right-0 top-4 flex flex-row items-start justify-center">
	<div class="w-fit relative flex flex-col items-center justify-start">
    <Toast />
		{#if $toasts.length > 1}
			<div
				class="flex size-14 shrink-0 flex-row items-center justify-center rounded-full overflow-hidden absolute top-0 left-full ml-4 bg-black text-xl font-bold text-white md:h-14"
				transition:scale={{ duration: 500, start: 0, easing: quintOut }}
			>
				+
				<div
					class="relative h-full w-4 overflow-hidden text-center"
					style="transform: translate(0, {100 * offset}%)"
				>
					<span
						class="absolute -top-full h-full w-full items-center justify-center text-center"
						aria-hidden="true"
					>
						{Math.floor($noOverflowingToasts + 1)}
					</span>
					<span class="absolute flex h-full w-full items-center justify-center text-center">
						{Math.floor($noOverflowingToasts)}
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>
