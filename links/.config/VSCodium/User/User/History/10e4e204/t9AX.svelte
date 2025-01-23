<script>
  import { Index } from '$lib/registry';
  let component = Index['test'];

  console.log(component);

</script>


{#await component?.component()}
  <p>
    Loading...
  </p>
{:then Component}
  <Component />
{:catch}
  <p>
    Component not found in registry.
  </p>
{/await}

{#await component?.raw()}
  <p>
    Loading...
  </p>
{:then rawFile}
  {rawFile}
{:catch}
  <p>
    Component not found in registry.
  </p>
{/await}
