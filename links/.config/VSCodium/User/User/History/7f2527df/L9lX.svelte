<script lang="ts">
  import type { Heading } from "./TOC.svelte";
  import TOCList from "./TOCList.svelte";

  interface Props {
    headings: Heading[];
  }
  const { headings }: Props = $props();
</script>

<ol class="ml-2">
  {#each headings as heading}
    <li class="mb-2 list-none">
      <a href="#{heading.id}" class="mt-1 max-w-[50px] transition-colors hocus:text-primary-500 dark:hocus:text-primary-600 px-1">
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <TOCList headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
