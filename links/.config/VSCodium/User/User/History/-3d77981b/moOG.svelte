<script>
  import { cn } from '$lib/utils';

  let { class:className, type="text", id, label, value = $bindable(), ...props } = $props();
  const baseClasses = 'text-base font-medium md:font-semibold w-full rounded-xl bg-neutral-800 px-4 py-2 text-neutral-100 placeholder:text-neutral-400';
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
