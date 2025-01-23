<script>
  import { onMount } from "svelte";

  const { src, alt, caption } = $props();
  console.log(attrs);
  let image = $state();
  let zoomed = $state(false)
</script>

<div class="page-image-container">
  <figure role="figure" {alt}>
    <img src={src} {alt} class="page-image" tabindex="0" bind:this={image} />
    <figcaption>{caption}</figcaption>
  </figure>
</div>

{#if zoomed}
  <div class="inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 scale-0 flex-col items-center justify-center cursor-zoom-out">
    <img src={src} {alt} class="page-image"  />
  </div>
{/if}
