<script>
  import { onMount } from 'svelte';
  import Toc from "./Toc.svelte"

  const { headings = [], currentHeadingId = '' } = $props()

  let tocLinks = [];

  onMount(() => {
    tocLinks = document.querySelectorAll('nav a');
  });
</script>

<ol class="ml-6">
  {#each headings as heading}
    <li class="mb-2 list-none">
      <a
        href={"#" + heading.id}
        class="hover:underline max-w-[50px] truncate"
      >
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <Toc headings={heading.children} {currentHeadingId} />
      {/if}
    </li>
  {/each}
</ol>
