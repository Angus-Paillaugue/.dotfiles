<script>
  const { children } = $props();
</script>

<div class="relative mt-2">
  <div
    class="bg-primary-400 relative flex h-[20rem] items-center overflow-auto rounded-xl md:p-12 lg:h-[28rem] component-preview"
  >
    <div class="z-10 mx-auto inline-block-4">
      {@render children()}
    </div>
  </div>
</div>

<style>
  .component-preview::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: radial-gradient(circle at 1px 1px, theme('colors.primary.800/0.25') 1px, transparent 0);
    background-size: 1rem 1rem;
    background-repeat: repeat;
    background-position: .5rem center;
  }

  :global(.component-preview > div > *:last-child) {
    margin-bottom: 0;
  }
</style>
