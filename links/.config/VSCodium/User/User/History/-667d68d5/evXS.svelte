<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  interface ChartSeries {
    name: string;
    data: { x: any; y: any }[];
  }

  interface Props {
    type?: string; // Chart type, e.g., 'line', 'bar'
    data?: Record<string, any>[]; // Data array
    xKey?: string; // Key for X-axis values
    yKeys?: string[]; // Keys for Y-axis values
    options?: Record<string, any>; // Additional ApexCharts options
  }

  export let type: string = 'line';
  export let data: Record<string, any>[] = [];
  export let xKey: string = '';
  export let yKeys: string[] = [];
  export let options: Record<string, any> = {};

  let chart: any;
  let chartElement: HTMLElement;
  let ApexCharts;

  function generateSeries(data: Record<string, any>[], xKey: string, yKeys: string[]): ChartSeries[] {
    return yKeys.map((key) => ({
      name: key,
      data: data.map((entry) => ({
        x: entry[xKey],
        y: entry[key],
      })),
    }));
  }

  function generateOptions(): Record<string, any> {
    const series = generateSeries(data, xKey, yKeys);
    const xaxisType: string = typeof data[0]?.[xKey] === 'number' ? 'numeric' : 'datetime';

    return {
      chart: {
        type,
        height: '100%',
        width: '100%',
      },
      xaxis: {
        type: xaxisType,
        labels: xaxisType === 'datetime' ? { format: 'yyyy-MM-dd' } : undefined,
      },
      yaxis: {
        labels: {
          formatter: (value: unknown) => (typeof value === 'number' ? value.toFixed(2) : value),
        },
      },
      tooltip: {
        x: xaxisType === 'datetime' ? { format: 'yyyy-MM-dd' } : undefined,
        y: {
          formatter: (value: unknown) => (typeof value === 'number' ? value.toFixed(2) : value),
        },
      },
      series,
      ...options, // Merge with user-defined options
    };
  }

  async function initChart() {
    const module = await import('apexcharts');
    ApexCharts = module.default;

    const chartOptions = generateOptions();
    chart = new ApexCharts(chartElement, chartOptions);
    await chart.render();
  }

  onMount(() => {
    initChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<!-- Loading state and chart container -->
<div style="min-height: 300px;">
  <div bind:this={chartElement}></div>
</div>
