<script>
	/**
	 * The Toaster component is used to display a list of toasts. Put it into your root-most layout
	 * @name Toaster
	 * @example
	 * <Toaster />
	 */

	import { fade, scale, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { OctagonX, TriangleAlert, Info, BadgeCheck, X } from 'lucide-svelte'
  import { toasts, removeToast } from './toasts.js';
	import { Counter } from '$lib/components';
	import { cn } from '$lib/utils';

	const { class: className, style="default" } = $props();

	let count = $state(0);
	$effect(() => {
		count = $toasts.length - 1
	});

	const toastColors = {
		success: 'text-green-500 dark:text-green-500',
		error: 'text-red-500 dark:text-red-500',
		warning: 'text-amber-600 dark:text-amber-600',
		info: 'text-text-heading-dark dark:text-text-heading-dark'
	};

	$inspect($toasts)
</script>

{#if style === 'ios'}
	<div class={cn("fixed left-0 right-0 top-4 flex flex-row items-start justify-center", className)}>
		<div class="w-fit relative flex flex-col items-center justify-start">
			{#each $toasts.slice(0, 1) as toast (toast.id)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<div
					class="group/toast w-[250px] md:w-[300px] flex cursor-pointer flex-row items-center justify-between gap-4 rounded-[1.75rem] bg-body-dark dark:bg-neutral-800 p-3 text-text-heading-dark transition-all hover:h-52 hover:w-[500px] h-12 md:h-14 relative shake shadow-lg overflow-hidden"
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
						{:else if toast.type === 'warning'}
							<TriangleAlert />
						{:else if toast.type === 'info'}
							<Info />
						{:else if toast.type === 'success'}
							<BadgeCheck />
						{/if}
					</span>

					<!-- {#if toast.hover} -->
						<div
							in:fade={{ delay: 150, easing: quintOut }}
							class="flex grow flex-col justify-between overflow-hidden mb-6 -translate-y-full group-hover/toast:translate-y-0 h-full transition-all"
						>
							<p class="overflow-y-auto m-0 text-base font-sans font-normal text-text-body-dark">{toast.message}</p>
							<div class="flex flex-row gap-4">
								{#if toast.closeButton}
									<button
										class="w-full rounded-full bg-neutral-600 dark:bg-neutral-700 text-text-heading-dark p-2 grow"
										onclick={() => removeToast(toast.id)}>Close</button
									>
								{/if}
								{#if toast.action}
									<button
										class="w-full rounded-full bg-neutral-600 dark:bg-neutral-700 text-text-heading-dark p-2 grow"
										onclick={() => {
											toast.action.callback(toast);
											if(toast.action.remove) removeToast(toast.id);
										}}>{toast.action.text}</button
									>
								{/if}
							</div>
						</div>
					<!-- {:else} -->
						<h3 class="text-xl m-0 font-bold ml-6 text-end overflow-hidden group-hover/toast:translate-x-full transition-all {toastColors[toast.type]}" in:fade={{ delay: 150, easing: quintOut }}>
							{toast.title}
						</h3>
					<!-- {/if} -->
				</div>
			{/each}
			{#if $toasts.length > 1 && style === "ios"}
				<div
					class={cn("flex h-12 md:h-14 aspect-square px-1 shrink-0 flex-row gap-1 items-center justify-center rounded-full overflow-hidden absolute top-0 left-full ml-4 bg-body-dark dark:bg-neutral-800 text-xl font-bold text-text-heading-dark shadow-lg", count > 99 && 'text-sm')}
					transition:scale={{ duration: 500, start: 0, easing: quintOut }}
				>
					+ <Counter bind:value={count} lineHeight={count > 99 ? 15 : 20} />
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div
		class={cn("fixed bottom-0 right-0 z-[51] flex max-h-[100vh-5rem] w-full max-w-[500px] flex-col-reverse gap-2 p-2 lg:p-4", className)}
	>
		{#each $toasts.slice(0, 4) as toast (toast.id)}
			<div
				role="alert"
				class="rounded-xl border bg-neutral-50 dark:bg-neutral-900 border-main dark:border-main-dark p-4 relative"
				animate:flip={{ duration: 500 }}
				transition:fly={{ duration: 250, x: '100%' }}
			>
				<div class="flex items-center gap-2">
					{#if toast.type === 'error'}
						<OctagonX class={toastColors[toast.type]} />
					{:else if toast.type === 'warning'}
						<TriangleAlert  class={toastColors[toast.type]}/>
					{:else if toast.type === 'info'}
						<Info class={cn(toastColors[toast.type], 'text-text-heading dark:text-text-heading')} />
					{:else if toast.type === 'success'}
						<BadgeCheck class={toastColors[toast.type]} />
					{/if}

					<strong class="block font-medium">{toast.title}</strong>
				</div>

				<p class="mb-0 mt-2 text-sm">
					{@html toast.message}
				</p>
				<button
					class="absolute right-2 top-2"
					name="Remove toast"
					aria-label="Remove toast"
					onclick={() => removeToast(toast.id)}
				>
					<X class="size-5" />
				</button>
			</div>
		{/each}
	</div>
{/if}


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
		animation-duration: .5s;
		animation-name: shake;
		animation-timing-function: linear;
		animation-delay: .5s;
	}
</style>
