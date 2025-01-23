<script lang="ts">
  import type { Heading } from "./TOC.svelte";
  import TOCList from "./TOCList.svelte";
  import { cn } from "$lib/utils";

  interface Props {
    headings: Heading[];
    root?: boolean;
  }
  const { headings, root = false }: Props = $props();
</script>

<ol class={cn("space-y-1 mt-1", !root && "ml-4 mb-2 border-l border-border")}>
  {#each headings as heading}
    <li class="list-none">
      <a href="#{heading.id}" class="transition-colors font-mono pl-4 w-24">
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <TOCList headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
