<script lang="ts">
  import { User as UserIcon, ChevronsUpDown, LogOut, Settings } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { useSidebar } from '$lib/components/ui/sidebar/index.js';
  import type { User } from '$lib/server/db/user';

  let { user }: { user: User } = $props();

  const sidebar = useSidebar();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex h-8 w-8 flex-col items-center justify-center rounded-lg bg-muted text-lg font-bold"
            >
              <span>{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{user.username}</span>
              <!-- <span class="truncate text-xs">{user.email}</span> -->
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
        side={sidebar.isMobile ? 'bottom' : 'right'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div
              class="flex h-8 w-8 flex-col items-center justify-center rounded-lg bg-muted text-lg font-bold"
            >
              <span>{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{user.username}</span>
              <!-- <span class="truncate text-xs">{user.email}</span> -->
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <a href="/app/account">
            <DropdownMenu.Item>
              <UserIcon />
              Account
            </DropdownMenu.Item>
          </a>
          <a href="/app/account/settings">
            <DropdownMenu.Item>
              <Settings />
              Settings
            </DropdownMenu.Item>
          </a>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <a href="/app/log-out">
          <DropdownMenu.Item>
            <LogOut />
            Log out
          </DropdownMenu.Item>
        </a>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
