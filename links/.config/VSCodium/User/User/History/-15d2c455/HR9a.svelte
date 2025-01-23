<script>
  import { cn } from '$lib/utils';
  const { children, color = 'primary', href, class: className, ...props } = $props();


  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex-grow text-base font-semibold capitalize cursor-pointer';

  const colorClasses = {
    primary: 'bg-gray-700 text-neutral-100 border border-gray-700 hover:border-gray-700/90 hover:bg-gray-700/90',
    secondary: 'bg-white text-neutral-900 hover:bg-gray-100 border',
  }
</script>

{#if !Object.keys(colorClasses).includes(color)}
  <fieldset class="flex flex-col gap-1">
    <legend>Error</legend>
    <p class="m-0"><b>WARNING</b> : {color} is not a valid color for a Button.</p>
    <p class="m-0">Colors can be "{Object.keys(colorClasses).join('", "')}"</p>
  </fieldset>
{:else}

  <!-- If the button is actually a link -->
  {#if href}
    <a class={cn(baseClasses, colorClasses[color], className)} {href} {...props}>
      {@render children()}
    </a>
  <!-- Else, it meas that the button is a plain button -->
  {:else}
    <button class={cn(baseClasses, colorClasses[color], className)} {...props}>
      {@render children()}
    </button>
  {/if}
{/if}
