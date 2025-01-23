<script lang="ts">
  import { toasts, toast, type ToastType } from '$lib/stores';
  import { slide, scale, fade } from 'svelte/transition';
  import { cn } from '$lib/utils';
  import { Info, TriangleAlert, CheckCheck, X } from 'lucide-svelte';
  import Button from './Button.svelte';

  const baseClasses = 'flex h-8 grow flex-row items-center justify-center gap-2 transition-all';
  const variantClasses = new Map([
    ['info', 'bg-blue-600/10 text-blue-600 border-blue-600 dark:bg-blue-400/20 dark:text-blue-400'],
    ['error', 'bg-destructive/10 dark:bg-red-400/20 dark:text-red-400 text-destructive border-destructive'],
    ['success', 'bg-emerald-600/10 text-emerald-600 border-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400']
  ]);

  let activeToast = $derived($toasts[0]);
  const variantProxy = new Proxy(variantClasses, {
    get: function(target, id: string) {
      return target.has(id) ? target.get(id) : target.get('info');
    },
  });

  let classes = $derived(cn(baseClasses, variantProxy.get(activeToast.type)));
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
  
{/if}
