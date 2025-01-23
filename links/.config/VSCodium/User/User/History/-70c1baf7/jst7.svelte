<script>
  import Digit from './Digit.svelte';
  import { cn } from '$lib/utils'

  const { value = $bindable(0), lineHeight, class:className, ...restProps } = $props();
  let digits = $state([0]);
  $inspect(value)

  $effect(() => {
    digits = value.toString().split('').map(Number)
  });
</script>


<div class={cn("overflow-hidden inline-flex justify-center items-center", className)} {...restProps}>
  {#each digits as digit, i (digits.length-i)}
    <Digit number={digit} {lineHeight}/>
  {/each}
</div>
