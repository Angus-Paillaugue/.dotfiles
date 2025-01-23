<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import type { Page } from "$lib/pages";
  import { MediaQuery } from "runed";

  interface Props {
    page: Page;
    sideBarOpen: boolean;
  }
  let { page, sideBarOpen = $bindable(false) }: Props = $props();
  let breadCrumbs: string[] = $derived(page.slug ? page.slug.split('/') : []);

  const isDesktop = new MediaQuery('(min-width: 768px)');
</script>

<div class="flex flex-row items-center justify-between bg-background border-b border-sidebar-border p-4">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      {#each breadCrumbs as crumb, i (crumb)}
        {#if i < breadCrumbs.length - 1}
          <Breadcrumb.Item>{crumb}</Breadcrumb.Item>
          <Breadcrumb.Separator />
        {:else}
          <Breadcrumb.Page>{crumb}</Breadcrumb.Page>
        {/if}
      {/each}
    </Breadcrumb.List>
  </Breadcrumb.Root>
</div>
