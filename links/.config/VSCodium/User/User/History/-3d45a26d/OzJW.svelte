<script>
  import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { OctagonX, TriangleAlert, Info, BadgeCheck } from 'lucide-svelte'
  import { toasts, removeToast } from './toasts.js';
  import { quintOut } from 'svelte/easing';

  const toastColors = {
		success: 'text-green-500',
		error: 'text-red-500',
		warning: 'text-amber-600',
		info: 'text-white'
	};
</script>

{#each $toasts.slice(0, 1) as toast, i (toast.id)}
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
      {:else if toast.type === 'warning'}
        <TriangleAlert />
      {:else if toast.type === 'info'}
        <Info />
      {:else}
        <BadgeCheck />
      {/if}
    </span>

    {#if toast.hover}
      <div
        in:fade={{ delay: 150, easing: quintOut }}
        class="flex h-full grow flex-col justify-between"
      >
        <p class="overflow-y-auto">{toast.message}</p>
        <!-- .flex.flex-row.gap-4 -->
        {#if toast.loseButton}
          <button
            class="w-full rounded-full bg-neutral-600 p-2"
            onclick={() => removeToast(toast.id)}>Close</button
          >
        {/if}
        {#if toast.action}
          <button
            class="w-full rounded-full bg-neutral-600 p-2"
            onclick={() => {
              toast.action.callback();
              removeToast(toast.id);
            }}>{toast.action.text}</button
          >
        {/if}
      </div>
    {:else}
      <h3 class="text-xl font-bold {toastColors[toast.type]}" in:fade={{ delay: 150, easing: quintOut }}>
        {toast.title}
      </h3>
    {/if}
  </div>
{/each}

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
