<script>
  import { cn } from '$lib/utils';
  const { children, color = 'primary', type = 'button', class: className, ...props } = $props();

  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex-grow text-base font-semibold';
  const colorClasses = {
    primary: 'bg-gray-700 text-neutral-100 border border-gray-700 hover:border-gray-700/90 hover:bg-gray-700/90',
    secondary: 'bg-white text-neutral-900 hover:bg-gray-100 border',
  }
</script>

{#if type === 'link'}
  <a class={cn(baseClasses, colorClasses[color], className)} {...props}>
    {@render children()}
  </a>
{:else}
  <button class={cn(baseClasses, colorClasses[color], className)} type={type} {...props}>
    {@render children()}
  </button>
{/if}
