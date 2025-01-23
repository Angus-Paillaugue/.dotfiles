<script>
  import { cn } from '$lib/utils';
  import Reveal from '../Reveal.svelte';

  const features = [
    {
      title: " Powerful Features",
      description: "Powerful features to help you manage and understand your logs better",
    }
  ];
</script>

<div class="flex flex-col">
  <Reveal>
    <h2 class="text-center text-4xl font-semibold text-neutral-800 dark:text-neutral-200">Everything You Need</h2>
  </Reveal>
  <Reveal>
    <h3 class="text-center text-lg font-medium text-neutral-600 dark:text-neutral-400">
      Powerful features to help you manage and understand your logs better
    </h3>
  </Reveal>

  <div class="grid mt-10" style="height: calc(100svh * {features.length} - 4rem);">
    {#each features as {title, description}, i}
      <div class={cn("h-svh grid grid-cols-2", i % 2 === 0 ? 'grid-flow-row' : 'grid-flow-row-dense')}>
        <!-- Text -->
        <div class="w-full flex flex-col sticky top-20 min-h-[50%] h-fit">
          <h1 class="text-xl font-medium">{title}</h1>
          <p class="text-base text-muted-foreground">{description}</p>
        </div>

        <!-- Image -->
      </div>
    {/each}
  </div>
</div>
