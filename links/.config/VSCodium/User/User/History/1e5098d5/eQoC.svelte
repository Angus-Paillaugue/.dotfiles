<script>
  import { cn } from '../utils';
  import Icon from '@iconify/svelte';

  const { class: className } = $props();
</script>

<Icon icon="svg-spinners:90-ring-with-bg" class={cn('size-4 animate-spin', className)} />
