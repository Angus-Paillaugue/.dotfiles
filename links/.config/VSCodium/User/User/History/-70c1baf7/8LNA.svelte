<script>
  const { value = $bindable(0) } = $props();
</script>


{#each Array(10) as _, i}
  <div class="digit transition-opacity duration-300" class:active={i==number}>{i}</div>
{/each}
