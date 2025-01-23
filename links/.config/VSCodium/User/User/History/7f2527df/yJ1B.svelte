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

<ol class={cn(!root && "ml-2 mb-2")}>
  {#each headings as heading}
    <li class="list-none flex w-full flex-col gap-2">
      <a href="#{heading.id}" class="transition-colors hocus:text-primary-500 dark:hocus:text-primary-600 px-1">
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <TOCList headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
