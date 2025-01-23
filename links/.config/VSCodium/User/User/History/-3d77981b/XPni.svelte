<script>
  import { cn } from '$lib/utils';

  const { class:className, type="text", id, label, value = $bindable(), ...props } = $props();
</script>

{#snippet input({ value, className, type, ...props })}
  <input
    class={cn('mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm', className)}
    type={type}
    name={id}
    {id}
    bind:value={value}
    {...props}
  />
{/snippet}

{#if label}
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  {@render input({ value, className, type, ...props })}
{:else}
  {@render input({ value, className, type, ...props })}
{/if}
