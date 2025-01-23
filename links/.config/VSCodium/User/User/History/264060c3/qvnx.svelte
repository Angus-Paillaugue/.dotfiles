<script lang="ts">
  import { toasts, toast, type ToastType } from "$lib/stores";
  import { slide, scale, fade } from "svelte/transition";
  import { tv } from 'tailwind-variants';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck, X } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button/index.js';

  const buttonVariants = tv({
    base: 'fixed bottom-2 left-2 flex flex-col z-40',
    variants: {
      variant: {
        info: 'bg-blue-600/10 text-blue-600 border-blue-600',
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
  <div class={cn(buttonVariants({ variant:activeToast.type }))}>
		{#each $toasts.slice(0, 4) as activeToast (activeToast.id)}
			<div class="flex flex-row items-center gap-4">
				<button class="absolute top-2 right-2" onclick={() => (toast.remove(activeToast.id))}>
					<X class="size-5" />
				</button>
				<div class="flex flex-row transition-all grow items-center justify-center gap-2" in:fade>
					{@render icon(activeToast.type)}
					<div class="flex flex-col gap-2">
						<span class="text-base font-normal">
							{activeToast.message}
						</span>
						{#if activeToast.options.action}
							<Button size="sm" class="py-0  h-8h-full px-3" onclick={() => {activeToast.options.action?.onClick({ dismiss: () => toast.remove(activeToast.id) })}}>
								{activeToast.options.action.label}
							</Button>
						{/if}
					</div>
				</div>
			</div>
    {/each}
  </div>
{/if}
