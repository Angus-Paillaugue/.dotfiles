<script>
  const { children } = $props();
</script>

<div class="relative mt-2" data-comp-preview="">
  <div
    class="bg-primary-400 relative flex h-[20rem] items-center overflow-x-auto rounded-xl md:px-12 lg:h-[28rem] lg:overflow-x-hidden before:absolute before:content-[''] before:inset-0 before:bg-radient-[circle_at_1px_1px] from-primary-900 to-transparent before:bg-[.5rem_center] bg-repeat"
    data-variant="default"
  >
    <div class="z-10 mx-auto inline-block px-4">
      {@render children()}
    </div>
  </div>
</div>
