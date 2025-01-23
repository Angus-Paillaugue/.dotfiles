<script>
  import { LoaderCircle } from 'lucide-svelte';
  import { cn } from '$lib/utils';

  const { class: className } = $props();
</script>

<LoaderCircle class={cn("size-4 animate-spin", className)} />
