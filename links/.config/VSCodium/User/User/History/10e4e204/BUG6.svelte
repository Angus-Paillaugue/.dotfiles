<script>
  import { Index } from '$lib/registry';
  let component = Index['test'];

  console.log(component);

</script>


{#await component?.component()}
  <div class="text-muted-foreground flex items-center text-sm">
    Loading...
  </div>
{:then Component}
  <Component />
{:catch}
  <p class="text-muted-foreground text-sm">
    Component not found in registry.
  </p>
{/await}

{#await component?.raw()}
  <div class="text-muted-foreground flex items-center text-sm">
    Loading...
{:then rawFile}
  {rawFile}
{:catch}
  <p class="text-muted-foreground text-sm">
    Component not found in registry.
  </p>
{/await}
