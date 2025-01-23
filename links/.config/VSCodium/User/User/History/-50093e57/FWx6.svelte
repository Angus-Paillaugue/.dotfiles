<script lang="ts">
  import { getTree, type Page } from "$lib/pages";
  import { cn } from "$lib/utils";
  import { page } from '$app/stores';
  import { ChevronDown } from 'lucide-svelte';
  import { MediaQuery } from "runed";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { afterNavigate } from "$app/navigation";

  const entries = getTree();
  const isDesktop = new MediaQuery('(min-width: 768px)');

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


{#if isDesktop.matches}
  <div class="shrink-0 h-full w-[300px] flex flex-col bg-sidebar p-2 border-r border-sidebar-border">
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
{:else}
  <Sheet.Root bind:open class="lg:invisible lg:hidden">
    <Sheet.Content side="left">
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
{/if}
