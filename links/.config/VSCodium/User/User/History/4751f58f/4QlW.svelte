<script>
  import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { OctagonX, TriangleAlert, Info, BadgeCheck } from 'lucide-svelte'
  import { toasts, removeToast } from './toasts.js';
  import { quintOut } from 'svelte/easing';
  import { cn } from '$lib/utils';

  const { style } = $props();

  const toastColors = {
		success: 'text-green-500 dark:text-green-500',
		error: 'text-red-500 dark:text-red-500',
		warning: 'text-amber-600 dark:text-amber-600',
		info: 'text-text-heading-dark dark:text-text-heading-dark'
	};
</script>

{#if style === 'ios'}
  {#each $toasts.slice(0, 1) as toast, i (toast.id)}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div
      class="group/toast w-[250px] md:w-[300px] flex cursor-pointer flex-row items-center justify-between gap-4 rounded-[1.75rem] bg-body-dark dark:bg-neutral-800 p-3 text-text-heading-dark transition-all hover:h-52 hover:w-[500px] h-12 md:h-14 relative shake shadow-lg"
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

      {#if toast.hover}
        <div
          in:fade={{ delay: 150, easing: quintOut }}
          class="flex h-full grow flex-col justify-between"
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
      {:else}
        <h3 class="text-xl m-0 font-bold {toastColors[toast.type]}" in:fade={{ delay: 150, easing: quintOut }}>
          {toast.title}
        </h3>
      {/if}
    </div>
  {/each}
{:else}
    {#each $toasts.slice(0, 4) as toast (toast.id)}
    <div
      role="alert"
      class={baseToastClasses}
      animate:flip={{ duration: 500 }}
      transition:fly={{ duration: 250, x: '100%' }}
    >
      <div class="flex items-center gap-2">
        {#if toast.type === 'error'}
          <Icon
            icon="material-symbols:dangerous-outline-rounded"
            class={cn('h-5 w-5', svgColors[toast.type])}
          />
          <OctagonX />
        {:else if toast.type === 'green'}
          <Icon
            icon="lucide:check"
            class={cn('h-5 w-5', svgColors[toast.type])}
          />
        {:else}
          <Icon
            icon="material-symbols:info-outline-rounded"
            class={cn('h-5 w-5', svgColors[toast.type])}
          />
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
        on:click={() => removeToast(toast.id)}
      >
        <Icon icon="lucide:x" class="size-5" />
      </button>
    </div>
  {/each}
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
