<script>
  import { cn } from '$lib/utils';
  const { class: className, children, style='default', ...props } = $props();

  const styleClasses = {
    default: 'bg-neutral-800 text-text-heading-dark',
    danger: ' bg-red-600 text-text-heading-dark'
  }
</script>

<button class={cn("flex flex-row items-center justify-center text-lg font-medium gap-2 w-full px-4 py-2 rounded-full", styleClasses[style], className)}>
  {@render children()}
</button>
