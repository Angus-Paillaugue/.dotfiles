<script lang="ts">
  import { onMount } from 'svelte';
  import { cn } from '$lib/utils';

  let ApexCharts = $state();
  let chartElement = $state();
  let chart = $state();

  let { options = $bindable() }: { any } = $props();

  let options = {};

  onMount(async () => {
    const module = await import('apexcharts');
    ApexCharts = module.default;
    Object.assign(window, { ApexCharts });

    chart = new ApexCharts(chartElement, options);
    chart.render();
  });

  $effect(() => {
    if (chart && data?.series && data?.categories) {
      options.series = data.series;
      options.xaxis.categories = data.categories;
      chart.updateOptions(options);
    }
  });
</script>

{#if hasNoData}
  <div class="flex h-64 items-center justify-center">
    <p class="text-gray-500">No data available</p>
  </div>
{:else}
  <!-- Chart is not in a else statement due to the ApexCharts library needing to access the element to populate it before rendering -->
  <div bind:this={chartElement} class={cn(canShow ? 'block' : 'hidden')}></div>
{/if}
