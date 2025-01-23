<script>
  import { fade, scale, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { OctagonX, TriangleAlert, Info, BadgeCheck, X } from 'lucide-svelte'
  import { toasts, removeToast } from './toasts.js';
  import { quintOut } from 'svelte/easing';

  const { style } = $props();

  const toastColors = {
		success: 'text-green-500 dark:text-green-500',
		error: 'text-red-500 dark:text-red-500',
		warning: 'text-amber-600 dark:text-amber-600',
		info: 'text-text-heading-dark dark:text-text-heading-dark'
	};
</script>

{#if style === 'ios'}
  
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
          <OctagonX class={toastColors[toast.type]} />
        {:else if toast.type === 'warning'}
          <TriangleAlert  class={toastColors[toast.type]}/>
        {:else if toast.type === 'info'}
          <Info class={toastColors[toast.type]} />
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
        on:click={() => removeToast(toast.id)}
      >
        <X class="size-5" />
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
