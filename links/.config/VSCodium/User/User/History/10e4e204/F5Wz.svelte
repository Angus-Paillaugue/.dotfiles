<script>
  import { Index } from '$lib/registry';
  import { page } from '$app/stores';
  console.log($page);
  // let component = Index['test'];


</script>


<!-- {#await component?.component()}
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
{/await} -->
