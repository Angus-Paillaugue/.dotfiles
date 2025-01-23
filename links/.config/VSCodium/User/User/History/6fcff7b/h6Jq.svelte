<script>
  const { src, alt, caption } = $props();
  let zoomed = $state(false)
</script>

<button onclick={() => (zoomed = true)} class="mb-4 rounded border border-main bg-neutral-100 p-2 dark:border-main-dark dark:bg-neutral-950 h-fit">
  <figure {alt}>
    <img src={src} {alt} class="object-contain cursor-zoom-in rounded" />
    <figcaption class="relative mt-2 block justify-center rounded-xl px-8 text-center text-base text-gray-700 dark:text-gray-400">{caption}</figcaption>
  </figure>
</button>

{#if zoomed}
  <div class="inset-0 fixed z-50 bg-neutral-300/50 dark:bg-neutral-800/50 transition-all duration-300 scale-0 flex-col items-center justify-center cursor-zoom-out">
    <img src={src} {alt} class="object-contain"  />
  </div>
{/if}
