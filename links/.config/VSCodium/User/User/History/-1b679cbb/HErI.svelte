<script>
  import { onMount } from 'svelte';
  import Toc from './Toc.svelte';

  const { headings = [], root = false } = $props();

  let tocLinks = [];

  onMount(() => {
    tocLinks = document.querySelectorAll('nav a');
  });
</script>

{#if root}
  <h6 class="font-medium text-base">On this page</h6>
{/if}

<ol class={!root && 'border-l-2 border-neutral-300/50 dark:border-neutral-700/50 pl-2.5 ml-1.5'}>
  {#each headings as heading}
    <li class="mb-2 first:mt-2 list-none">
      <a
        href={'#' + heading.id}
        class="dark:hover:text-primary-600 hover:text-primary-500 transition-colors mt-1 w-fit max-w-[50px] truncate {!root &&
          'px-1'}"
      >
        {heading.text}
      </a>
      {#if heading.children.length > 0}
        <Toc headings={heading.children} />
      {/if}
    </li>
  {/each}
</ol>
