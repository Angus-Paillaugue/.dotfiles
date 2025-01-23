<script>
  import { cn } from '$lib/utils';

  let { class:className, type="text", id, label, value = $bindable(), ...props } = $props();
  const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
</script>

<div class="flex flex-col gap-1 w-full">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  {/if}
  <input
    class={cn(baseClasses, className)}
    type={type}
    name={id}
    {id}
    bind:value
    {...props}
  />
</div>
