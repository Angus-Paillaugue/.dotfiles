<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import type { Page } from "$lib/pages";
  import { MediaQuery } from "runed";
  import { PanelLeft } from "lucide-svelte";

  interface Props {
    page: Page;
    sideBarOpen: boolean;
  }
  let { page, sideBarOpen = $bindable(false) }: Props = $props();
  let breadCrumbs: string[] = $derived(page.slug ? page.slug.split('/') : []);

  const isMobile = new MediaQuery('(max-width: 768px)');
</script>

<div class="flex flex-row items-center h-14 px-4 shrink-0 justify-between bg-background border-b border-sidebar-border">
  <div class="flex flex-row gap-4">
    {#if isMobile.matches}
      <button onclick={() => (sideBarOpen = !sideBarOpen)}>
        <PanelLeft class="size-4 text-sidebar-foreground" />
      </button>
    {/if}
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
</div>
