<script>
  import Digit from './Digit.svelte'

  const { value = $bindable(0) } = $props();
</script>


<div class="overflow-hidden inline-flex justify-center items-center">
  {#each digits as digit, i (digits.length-i)}
    <Digit number={digit}/>
  {/each}
</div>
