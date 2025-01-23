<script>
  const { children } = $props();
</script>

<div class="relative mt-2">
  <div
    class="bg-primary-400 relative flex h-[20rem] items-center overflow-x-auto rounded-xl md:px-12 lg:h-[28rem] lg:overflow-x-hidden component-preview"
    data-variant="default"
  >
    <div class="z-10 mx-auto inline-block px-4">
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
    background-image: radial-gradient(circle at 1px 1px, theme('colors.primary.800' / .25) 1px, transparent 0);
    background-size: 1rem 1rem;
    background-repeat: repeat;
    background-position: .5rem center;
  }
</style>
