<script>
  import { cn } from "$lib/utils";

  const { children, class: className } = $props();

</script>

<button aria-label="Button" class={cn("text-black", className)}>
  {@render children()}
</button>
