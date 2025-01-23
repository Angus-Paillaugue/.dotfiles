<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    type: string;
    data: unknown[];
    xKey: string;
    yKeys: string[];
  }
  const { type = 'line', data = [], xKey = '', yKeys = [] }: Props = $props();

  let chart: unknown = $state();
  let chartElement: unknown = $state();
  let ApexCharts;

  onMount(() => {
    (async () => {
    const module = await import('apexcharts');
    ApexCharts = module.default;
    Object.assign(window, { ApexCharts });

    // Prepare chart options
    const series = yKeys.map((key) => ({
      name: key,
      data: data.map((entry) => ({
        x: entry[xKey],
        y: entry[key]
      }))
    }));

    const options = {
      chart: {
        type,
        height: '100%',
        width: '100%',
      },
      title: {
        align: 'center',
      },
      xaxis: {
        type: 'datetime',
        labels: { format: 'yyyy-MM-dd' },
      },
      yaxis: {
        title: {
          text: 'Values',
        },
      },
      tooltip: {
        x: {
          format: 'yyyy-MM-dd',
        },
      },
      series,
    };

    // Initialize the chart
    chart = new ApexCharts(chartElement, options);
    chart.render();
    })();

    return () => {
      chart.destroy(); // Clean up
    };
  });
</script>

<div bind:this={chartElement} style="min-height: 300px;"></div>
