<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import type { Page } from "$lib/pages";

  interface Props {
    page: Page
  }
  let { page } = $props();
  let breadCrumbs: string[] = $derived(page.slug ? page.slug.split('/') : []);

  $inspect(breadCrumbs)
</script>

<div class="flex flex-row items-center justify-between bg-background border-b border-sidebar-border p-4">

  <Breadcrumb.Root>
    <Breadcrumb.List>
      {#each breadCrumbs as crumb, i (crumb)}
      {#if }
        
      {/if}
        <Breadcrumb.Item>
          <Breadcrumb.Link>{crumb}</Breadcrumb.Link>
        </Breadcrumb.Item>
        {#if i < breadCrumbs.length - 1}
          <Breadcrumb.Separator />
        {/if}
      {/each}
    </Breadcrumb.List>
  </Breadcrumb.Root>
</div>
