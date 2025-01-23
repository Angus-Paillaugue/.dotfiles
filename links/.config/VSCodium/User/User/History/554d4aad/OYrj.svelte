<script lang="ts">
  import { toasts, toast, type ToastType } from '$lib/stores';
  import { slide, scale, fade } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck, X } from 'lucide-svelte';
  import Button from './Button.svelte';
	import { flip } from 'svelte/animate';

  const baseClasses = 'flex grow flex-row items-center gap-2 transition-all p-4 border rounded-lg bg-secondary';
  const variantClasses = new Map([
    ['info', 'border-blue-600/50'],
    ['error', 'border-destructive/50'],
    ['success', 'border-emerald-600/50']
  ]);

  const iconVariants = new Map([
    ['info', 'text-blue-600'],
    ['error', 'text-destructive'],
    ['success', 'text-emerald-600']
  ]);
</script>

{#snippet icon(type: ToastType)}
  {@const classes = iconVariants.get(type)}
  {#if type === 'info'}
    <Info class="size-5" />
  {:else if type === 'error'}
    <TriangleAlert class="size-5" />
  {:else if type === 'success'}
    <CheckCheck class="size-5" />
  {/if}
{/snippet}

{#if $toasts.length > 0}
  <div class="flex flex-col gap-2 fixed bottom-2 right-2 z-30 max-w-[400px]">
    {#each $toasts as toast (toast.id)}
      <div
        class={cn(baseClasses, variantClasses.get(toast.type))}
        animate:flip
        transition:slide={{ duration: 300, axis: 'x' }}
      >
        {@render icon(toast.type)}
        <span class="grow">{toast.message}</span>
        <Button
          variant={["icon", "secondary"]}
          class="shrink-0"
          onclick={() => toasts.update((t) => t.filter((t) => t.id !== toast.id))}
        >
          <X class="size-full" />
        </Button>
      </div>
    {/each}
  </div>
{/if}
