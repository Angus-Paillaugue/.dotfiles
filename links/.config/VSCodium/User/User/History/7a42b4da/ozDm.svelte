<script>
  import { cn } from '$lib/utils';
  const { class: className, children, ...props } = $props();
</script>

<button class={cn("flex flex-row items-center justify-center text-lg font-medium gap-2 w-full px-4 py-2 bg-neutral-800 rounded-full text-text-heading-dark", className)}>
  {@render children()}
</button>
