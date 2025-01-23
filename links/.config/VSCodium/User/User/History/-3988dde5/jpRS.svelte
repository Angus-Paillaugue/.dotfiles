<script>
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { spring } from 'svelte/motion';
	import { OctagonX } from 'lucide-svelte'

	let toasts = $state([]);
	let count = $derived(toasts.length - 1);
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

	const toastColors = {
		success: 'text-green-500',
		error: 'text-red-500',
		warning: 'text-yellow-500',
		info: 'text-white'
	};

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
		toasts.push(newToast);
		// setTimeout(() => {
		// 	removeToast(newToast.id);
		// }, 5000);
	}
	function removeToast(id) {
		toasts = toasts.filter((toast) => toast.id !== id);
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
		{#each toasts.slice(0, 1) as toast, i (toast.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="group/toast w-[250px] md:w-[300px] flex cursor-pointer flex-row items-center justify-between gap-4 rounded-[1.75rem] bg-black p-3 text-white transition-all hover:h-52 hover:w-[500px] h-14 relative shake"
				data-id={toast.id}
				transition:scale={{ duration: 500, easing: quintOut, start:0, opacity: 0 }}
				animate:flip={{ duration: 100 }}
				onclick={() => (toast.hover = true)}
				onmouseenter={() => (toast.hover = true)}
				onmouseleave={() => (toast.hover = false)}
				onfocus={() => (toast.hover = true)}
				onblur={() => (toast.hover = false)}
				tabindex="0"
			>
				<span class="{toastColors[toast.type]}">
					{#if toast.type === 'error'}
						<OctagonX />
					{:else}
					{toast.type}
					{/if}
				</span>

				{#if toast.hover}
					<div
						in:fade={{ delay: 150, easing: quintOut }}
						class="flex h-full flex-col justify-between"
					>
						<p class="overflow-y-auto">{toast.message}</p>
						<button
							class="w-full rounded-full bg-neutral-600 p-2"
							onclick={() => {
								removeToast(toast.id);
							}}>Close</button
						>
					</div>
				{:else}
					<h3 class="text-xl font-bold {toastColors[toast.type]}" in:fade={{ delay: 150, easing: quintOut }}>
						{toast.title}
					</h3>
				{/if}
			</div>
		{/each}
		{#if toasts.length > 1}
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

<style>
	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-10px);
		}
		50% {
			transform: translateX(10px);
		}
		75% {
			transform: translateX(-10px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.shake {
		animation: 0.5s linear 0.2s shake ;
	}
</style>
