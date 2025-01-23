<script>
  import Reveal from '../Reveal.svelte';

  const features = [
    {
      title: " Powerful Features",
      description: "Powerful features to help you manage and understand your logs better",
    }
  ]

</script>

<div class="flex flex-col">
  <Reveal yOffset={200} inViewMargin="10px">
    <h2 class="text-center text-4xl font-semibold text-neutral-800 dark:text-neutral-200">Everything You Need</h2>
  </Reveal>
  <Reveal>
    <h3 class="text-center text-lg font-medium text-neutral-600 dark:text-neutral-400">
      Powerful features to help you manage and understand your logs better
    </h3>
  </Reveal>

  <div class="grid" style="height: calc(100svh * {features.length} - 4rem);">
    {#each features as {title, description}}
      <div class="h-svh grid grid-cols-2">
        <!-- Text -->
        <div class="w-full flex flex-col sticky top-24 h-fit">
          {title}
          {description}
        </div>

        <!-- Image -->
      </div>
    {/each}
  </div>
</div>
