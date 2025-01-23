<script lang="ts">
  import { toasts, type ToastType } from "$lib/stores";
  import { slide, scale } from "svelte/transition";
  import { type VariantProps, tv } from 'tailwind-variants';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck } from 'lucide-svelte';

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
  const icons: { [key in ToastType]: any } = {
    info: Info,
    error: TriangleAlert,
    success:CheckCheck
  };
  let activeToast = $derived($toasts[0]);
</script>

{#if $toasts.length > 0}
  <div class="text-primary" transition:slide={{ axis:'y' }}>
    <div class={cn(buttonVariants({ variant:activeToast.type }))}>
      <div class="flex flex-row items-center justify-center gap-2">
        <svelte:component this={icons[activeToast.type]} class="w-6 h-6" />
        <span class="text-base font-medium">
          {activeToast.message}
        </span>
      </div>
      {#if $toasts.length > 1}
        <span class="text-lg font-bold" transition:scale>
          +{$toasts.length - 1}
        </span>
      {/if}
    </div>
  </div>
{/if}
