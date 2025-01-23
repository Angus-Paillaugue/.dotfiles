<script>
  import Digit from './Digit.svelte'

  const { value = $bindable(0), lineHeight } = $props();
  let digits = $state([0]);

  $effect(() => {
    digits = value.toString().split('').map(Number)
  });
</script>


<div class="overflow-hidden inline-flex justify-center items-center">
  {#each digits as digit, i (digits.length-i)}
    <Digit number={digit} {lineHeight}/>
  {/each}
</div>
