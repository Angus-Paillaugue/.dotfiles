<script>
  const { src, alt, caption } = $props();
  let zoomed = $state(false)
</script>

<button onclick={() => (zoomed = true)}>
  <figure {alt}>
    <img src={src} {alt} class="object-contain" />
    <figcaption>{caption}</figcaption>
  </figure>
</button>

{#if zoomed}
  <div class="inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 scale-0 flex-col items-center justify-center cursor-zoom-out">
    <img src={src} {alt} class="object-contain"  />
  </div>
{/if}
