<script lang="ts">
  import { toasts, toast, type ToastType } from "$lib/stores";
  import { slide, scale } from "svelte/transition";
  import { tv } from 'tailwind-variants';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck, X } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';

  const buttonVariants = tv({
    base: 'flex flex-row items-center justify-between py-2 px-4 border-b',
    variants: {
      variant: {
        info: 'bg-primary text-primary-foreground hover:bg-primary/90',
        error: 'bg-destructive/10 text-destructive border-destructive',
        success: 'bg-emerald-600/10 text-emerald-600 border-emerald-600'
      },
    },
    defaultVariants: {
      variant: 'info'
    }
  });
  let activeToast = $derived($toasts[0]);
</script>

{#snippet icon(type: ToastType)}
  {#if type === 'info'}
    <Info class="size-5" />
  {:else if type === 'error'}
    <TriangleAlert class="size-5" />
  {:else if type === 'success'}
    <CheckCheck class="size-5" />
  {/if}
{/snippet}

{#if $toasts.length > 0}
  <div class="text-primary" transition:slide={{ axis:'y' }}>
    <div class={cn(buttonVariants({ variant:activeToast.type }))}>
      <button onclick={() => (toast.remove(activeToast.id))}>
        <X class="size-5" />
      </button>
      <div class="flex flex-row transition-all grow items-center justify-center gap-2">
        {@render icon(activeToast.type)}
        <span class="text-base font-normal">
          {activeToast.message}
        </span>
        {#if activeToast.options.action}
          <Button size="sm" class="py-0 h-8 px-3" onclick={() => {activeToast.options.action?.onClick({ dismiss: () => toast.remove(activeToast.id) })}}>
            {activeToast.options.action.label}
          </Button>
        {/if}
      </div>
      <div class="w-5">
        {#if $toasts.length > 1}
          <span class="text-lg shrink-0 font-bold" transition:scale={{ start:0 }}>
            +{$toasts.length - 1}
          </span>
        {/if}
      </div>
    </div>
  </div>
{/if}
