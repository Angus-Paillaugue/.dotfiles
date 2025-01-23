<script>
  import { cn } from '$lib/utils';
  const { children, color = 'primary', href, class: className, ...props } = $props();


  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex-grow text-base font-semibold capitalize cursor-pointer';

  const colorClasses = {
    primary: 'text-neutral-900 dark:text-neutral-100 bg-neutral-200/50 dark:bg-neutral-800 dark:hover:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200',
    secondary: 'text-neutral-900 dark:text-neutral-100 bg-white border border-main hover:bg-neutral-100 dark:bg-neutral-950 dark:border-neutral-700 dark:hover:bg-neutral-950/50',
    ghost: 'text-neutral-900 dark:text-neutral-100 border border-main dark:border-main-dark',
    square: 'size-10 p-2',
  }
</script>

<!-- Error handling -->
{#if color.split(" ").some(c => !Object.keys(colorClasses).includes(c))}
  <fieldset class="border border-main dark:border-main-dark p-3 w-fit flex flex-col gap-1">
    <legend><b>Error</b></legend>
    <p class="m-0">"{color}" is not a valid color for a Button.</p>
    <p class="m-0">Colors can be "{Object.keys(colorClasses).join('", "')}"</p>
  </fieldset>
{:else}

  <!-- If the button is actually a link -->
  {#if href}
    <a class={cn(baseClasses, color.split(" ").map(c => colorClasses[c]), className)} {href} {...props}>
      {@render children()}
    </a>
  <!-- Else, it meas that the button is a plain button -->
  {:else}
    <button class={cn(baseClasses, color.split(" ").map(c => colorClasses[c]), className)} {...props}>
      {@render children()}
    </button>
  {/if}
{/if}
