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
  <div class="fixed z-50 inset-0"></div>
{/if}
