<script>
  import { Index } from '$lib/registry';
  let component = Index['test'];

  console.log(component);
  
</script>


<svelte:component this={component.component} />
