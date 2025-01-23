<script>
  const { data } = $props();
  const { component } = data;
  console.log(component);

</script>


<svelte:component this={component.component} />
