<script>
  import { Index } from '$lib/registry';
  let component = Index['test']?.component();

  console.log(component);

</script>


{#await component}
  <div class="text-muted-foreground flex items-center text-sm">
    Loading...
  </div>
{:then Component}
  <Component />
{:catch}
  <p class="text-muted-foreground text-sm">
    Component
    <code
      class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
    >
    </code>
    not found in registry.
  </p>
{/await}


