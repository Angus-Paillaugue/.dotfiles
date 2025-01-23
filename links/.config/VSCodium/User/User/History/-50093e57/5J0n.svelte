<script lang="ts">
  import { getTree, type Page } from "$lib/pages";
  import { cn } from "$lib/utils";
  import { page } from '$app/stores';
  import { ChevronDown } from 'lucide-svelte';
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { afterNavigate } from "$app/navigation";
  import * as Sidebar from "$lib/components/ui/sidebar/sidebar-menu-action.svelte";

  const entries = getTree();

  let { open = $bindable(false) } = $props();

  afterNavigate(() => {
    open = false;
  });
</script>

{#snippet child(p: Page)}
  <li
    class={cn("flex cursor-pointer items-center justify-between w-full rounded-md text-sm font-medium ring-sidebar-ring", $page.url.pathname === p.url ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground')}
  >
    <a href={p.url} class="px-4 py-2 w-full">{p.name}</a>
  </li>
{/snippet}

<!-- On desktop -->
<div class="shrink-0 h-full w-[300px] flex flex-col bg-sidebar p-2 border-r border-sidebar-border max-lg:invisible max-lg:hidden">
  <a
    href="/"
    class="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-[width,height,padding] focus-visible:ring-2 data-[active=true]:font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm"
  >
    <img src="/logos/Light.svg" class="size-8 rounded-md" alt="OwnLogs logo">
    <div class="grid flex-1 text-left text-sm leading-tight">
      <span class="truncate font-semibold">OwnLogs</span>
    </div>
  </a>
  <!-- Pages list -->
  <ul class="flex flex-col w-full">
    {#each entries as p}
      {#if p?.children}
        {@const active = p.children.some((c) => c.url === $page.url.pathname)}
        <details
          open={active}
          class="flex flex-col gap-1 w-full group"
        >
          <summary
            class="flex items-center justify-between px-4 py-2 w-full rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
          >
            <span>{p.name}</span>
            <ChevronDown class="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <ul class="flex flex-col gap-1 px-4 relative list none px-2.5 mx-3.5 border-l border-sidebar-border py-0.5">
            {#each p.children as page}
              {@render child(page)}
            {/each}
          </ul>
        </details>
      {:else}
        {@render child(p)}
      {/if}
    {/each}
  </ul>
</div>

<!-- On mobile -->
<Sheet.Root bind:open>
  <Sheet.Content side="left" class="lg:invisible lg:hidden">
    <Sheet.Header>
      <Sheet.Title>OwnLogs</Sheet.Title>
    </Sheet.Header>
    <ul class="flex flex-col items-start justify-start w-full">
      {#each entries as p}
        {#if p?.children}
          {@const active = p.children.some((c) => c.url === $page.url.pathname)}
          <details
            open={active}
            class="flex flex-col gap-1 w-full group"
          >
            <summary
              class="flex items-center justify-between px-4 py-2 w-full rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
            >
              <span>{p.name}</span>
              <ChevronDown class="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <ul class="flex flex-col gap-1 px-4 relative list none px-2.5 mx-3.5 border-l border-sidebar-border py-0.5">
              {#each p.children as page}
                {@render child(page)}
              {/each}
            </ul>
          </details>
        {:else}
          {@render child(p)}
        {/if}
      {/each}
    </ul>
  </Sheet.Content>
</Sheet.Root>
