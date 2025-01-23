<script>
  import { onMount } from "svelte";

  const { src, alt, caption } = $props();
  console.log(attrs);
  let image = $state();
</script>

<div class="page-image-container">
  <figure role="figure" {alt}>
    <img src={src} {alt} class="page-image" tabindex="0" bind:this={image} />
    <figcaption>{caption}</figcaption>
  </figure>
</div>
