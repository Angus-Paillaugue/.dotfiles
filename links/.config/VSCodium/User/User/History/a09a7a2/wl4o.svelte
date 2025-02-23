<script lang="ts">
  import * as Collapsible from '$lib/components/ui/collapsible/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import ChevronRight from 'lucide-svelte/icons/chevron-right';
  import { page } from '$app/stores';
  import { urlStartsWith } from '$lib/utils';
  import { hasPermission } from '@shared/roles';
  import type { User } from '$lib/server/db/user';

  let {
    items,
    user
  }: {
    items: {
      title: string;
      url: string;
      permissions: string[];
      // This should be `Component` after lucide-svelte updates types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: any;
      items?: {
        title: string;
        url: string;
        permissions: string[];
      }[];
    }[];
    user: User;
  } = $props();
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as mainItem (mainItem.title)}
      {#if hasPermission(user.role, ...mainItem.permissions)}
        <Collapsible.Root open={urlStartsWith($page.url.pathname, mainItem.url)}>
          {#snippet child({ props })}
            <Sidebar.MenuItem {...props}>
              <Sidebar.MenuButton>
                {#snippet tooltipContent()}
                  {mainItem.title}
                {/snippet}
                {#snippet child({ props })}
                  <a href={mainItem.url} {...props}>
                    <mainItem.icon />
                    <span>{mainItem.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
              {#if mainItem.items?.length && mainItem.items.some((item) => hasPermission(user.role, ...item.permissions))}
                <Collapsible.Trigger>
                  {#snippet child({ props })}
                    <Sidebar.MenuAction {...props} class="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span class="sr-only">Toggle</span>
                    </Sidebar.MenuAction>
                  {/snippet}
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <Sidebar.MenuSub>
                    {#each mainItem.items as subItem (subItem.title)}
                      <Sidebar.MenuSubItem>
                        <Sidebar.MenuSubButton href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Sidebar.MenuSubButton>
                      </Sidebar.MenuSubItem>
                    {/each}
                  </Sidebar.MenuSub>
                </Collapsible.Content>
              {/if}
            </Sidebar.MenuItem>
          {/snippet}
        </Collapsible.Root>
      {/if}
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
