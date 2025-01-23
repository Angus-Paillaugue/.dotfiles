<script lang="ts">
  import { toasts, type ToastType } from "$lib/stores";
  import { slide, scale } from "svelte/transition";
  import { tv } from 'tailwind-variants';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';

  $inspect($toasts)

  const buttonVariants = tv({
    base: 'flex flex-row items-center justify-between py-2 px-4 border-b',
    variants: {
      variant: {
        info: 'bg-primary text-primary-foreground hover:bg-primary/90',
        error: 'bg-destructive/10 text-destructive border-destructive',
        success: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border'
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
      <div class="flex flex-row grow items-center justify-center gap-2">
        {@render icon(activeToast.type)}
        <span class="text-base font-normal">
          {activeToast.message}
        </span>
        {#if activeToast.options.action}
          <Button size="sm" class="py-0 h-8 px-3" onclick={() => {activeToast.options.action?.onClick()}}>
            {activeToast.options.action.label}
          </Button>
        {/if}
      </div>
      {#if $toasts.length > 1}
        <span class="text-lg shrink-0 font-bold" transition:scale>
          +{$toasts.length - 1}
        </span>
      {/if}
    </div>
  </div>
{/if}
