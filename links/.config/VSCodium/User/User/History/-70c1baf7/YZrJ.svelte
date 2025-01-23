<script>
  import Digit from './Digit.svelte'

  const { value = $bindable(0) } = $props();
  let digits = $state(value.toString().split('').map(Number))
</script>


{#each digits as digit, i (digits.length-i)}
  <Digit number={digit}/>
{/each}
