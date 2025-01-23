<script>
  const { data } = $props();

  console.log(data);
  
</script>


<svelte:component this={data.component} />
