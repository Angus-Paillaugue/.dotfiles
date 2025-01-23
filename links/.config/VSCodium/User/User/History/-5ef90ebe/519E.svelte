<script>
  const { children } = $props();
</script>

<div class="relative mt-2" data-comp-preview="">
  <div
    class="bg-magnum-400 force-dark svelte-1nbcpj3 relative flex h-[20rem] items-center overflow-x-auto rounded-xl md:px-12 lg:h-[28rem] lg:overflow-x-hidden"
    data-variant="default"
  >
    <div class="z-10 mx-auto inline-block px-4">
      {@render children()}
    </div>
  </div>
</div>
