<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    value: string;
    class?: string;
    children: () => any;
  }

  let { value = $bindable(), class: className, children, ...restProps }: Props = $props();

  const baseClasses = 'rounded-lg bg-input';
  const mergedClasses = cn(baseClasses, className);
</script>

<select bind:value class={mergedClasses} {...restProps}>
  {@render children()}
</select>
