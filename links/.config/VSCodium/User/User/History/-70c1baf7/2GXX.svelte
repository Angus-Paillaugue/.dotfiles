<script>
  import Digit from './Digit.svelte'

  const { value = $bindable(0) } = $props();
  let digits = $state(value.toString().split('').map(Number))
</script>


<div class="overflow-hidden inline-flex justify-center items-center">
  {#each digits as digit, i (digits.length-i)}
    <Digit number={digit}/>
  {/each}
</div>
