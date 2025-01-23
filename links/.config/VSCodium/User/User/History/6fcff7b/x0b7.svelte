<script>
  const { src, alt } = $props();
  console.log(attrs);

</script>

<div class="page-image-container">
  <figure role="figure" {alt}>
    <img src={src} {alt} class="page-image" tabindex="0" />
    <figcaption>${caption}</figcaption>
  </figure>
</div>
