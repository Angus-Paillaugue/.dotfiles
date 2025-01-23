<script>
  import { onMount } from 'svelte';
  import Toc from "./Toc.svelte"

  const { headings = [], root = false } = $props()

  let tocLinks = [];

  onMount(() => {
    tocLinks = document.querySelectorAll('nav a');
  });
</script>

<ol class="{root ? 'p-4 rounded-md' : 'border-l-2 border-neutral-700 pl-4'}">
  {#each headings as heading}
    <li class="mb-2 list-none">
      <a
        href={"#" + heading.id}
        class="text-neutral-950 hover:text-neutral-600 transition-colors mt-1 w-fit max-w-[50px] truncate {!root && "px-1"}"
      >
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <Toc headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
