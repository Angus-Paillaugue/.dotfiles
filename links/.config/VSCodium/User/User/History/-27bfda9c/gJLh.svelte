<script lang="ts">
  import { onMount } from 'svelte';

  const { children } = $props();
  let heading: HTMLHeadingElement | undefined = $state();

  onMount(() => {
    if (!heading) return;
    heading.id = heading.innerText.toLowerCase().replace(/ /g, '-');
  });
</script>

<h1
  class="border-b border-border leading-[3rem]"
  bind:this={heading}
>
  {@render children()}
</h1>
