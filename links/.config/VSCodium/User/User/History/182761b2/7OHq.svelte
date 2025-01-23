<script lang="ts">
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { pageMetadata } from '$lib/stores';

  let { children, data } = $props();
  const { user, servers } = data;
</script>


<div class="relative max-w-screen-2xl mx-auto translate-x-0 overflow-hidden">
  <Sidebar.Provider class="h-svh w-full">
    <AppSidebar {user} {servers} />
    <Sidebar.Inset class="overflow-y-auto overflow-x-hidden no-scollbar">
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <Sidebar.Trigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb.Root>
            <Breadcrumb.List>
              {#each $pageMetadata.breadcrumbs as breadcrumb, i}
                {#if i < $pageMetadata.breadcrumbs.length - 1}
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href={breadcrumb.url}>{breadcrumb.name}</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                {:else}
                  <Breadcrumb.Page>
                    <Breadcrumb.Link>{breadcrumb.name}</Breadcrumb.Link>
                  </Breadcrumb.Page>
                {/if}
              {/each}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </div>
      </header>
      {@render children?.()}
    </Sidebar.Inset>
  </Sidebar.Provider>
</div>
