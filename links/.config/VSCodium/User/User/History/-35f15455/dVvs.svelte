<script>
  import { onMount } from "svelte";

  const { children, } = $props();
  let this = $state()

  onMount(() => {
    const h1 = document.querySelector("h1");
    h1.classList.add("text-4xl", "dark:text-4xl");
  });
</script>

<h1 class="border-b border-main leading-[3rem] dark:border-main-dark" bind:this>
  {@render children()}
</h1>
