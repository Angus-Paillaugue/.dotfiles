<script>
  import { onMount } from 'svelte';

  export let type = 'line'; // Default chart type
  export let data = []; // Array of data
  export let xKey = ''; // The key for x-axis values
  export let yKeys = []; // The keys for y-axis values (series)

  let chart;
  let chartElement;
  let ApexCharts;

  onMount(async() => {
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
        text: title,
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

    return () => {
      chart.destroy(); // Clean up
    };
  });
</script>

<div bind:this={chartElement} style="min-height: 300px;"></div>
