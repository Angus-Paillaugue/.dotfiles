<script>
  import { cn } from '$lib/utils';

  const { children, class: className } = $props();
</script>

<div class={cn("flex flex-row gap-4 flex-no-wrap", className)}>
  {@render children()}
</div>
