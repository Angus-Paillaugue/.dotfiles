<script>
  import { onMount } from 'svelte';
  import Toc from './Toc.svelte';

  const { headers, root = false } = $props();
  let activeHeader = $state('');
  let tocElement = $state(); // added variable here

  onMount(() => {
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeHeader = entry.target.id;
            scrollTocToActiveHeader(); // added function here
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    // Observe both h2 and h3 headers
    headers.forEach((header) => {
      const element = document.getElementById(header.id);
      if (element) observer.observe(element);

      header.children.forEach((childHeader) => {
        const childElement = document.getElementById(childHeader.id);
        if (childElement) observer.observe(childElement);
      });
    });

    return () => observer.disconnect();
  });

  function scrollTocToActiveHeader() {
    // added code for function here
    if (tocElement && activeHeader) {
      const activeElement = tocElement.querySelector(`a[href="#${activeHeader}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }
</script>

{#if root}
  <nav class="w-56 sticky top-36 overflow-auto" bind:this={tocElement}>
    <ul>
      {#each headers as header}
        <li class:active={activeHeader === header.id} class="list-none">
          <a href="#{header.id}">{header.text}</a>
          {#if header.children.length > 0}
            <Toc headers={header.children} />
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style>
  .active {
    font-weight: bold;
    color: #ff3e00; /* Svelte's orange */
  }
  .active li {
    font-weight: initial;
    color: initial;
  }
</style>
