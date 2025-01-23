<script>
  import { onMount } from 'svelte';
  import ApexCharts from 'apexcharts';

  export let title = '';
  export let description = '';
  export let type = 'line'; // Default chart type
  export let data = []; // Array of data
  export let xKey = ''; // The key for x-axis values
  export let yKeys = []; // The keys for y-axis values (series)

  let chart;

  onMount(() => {
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
    chart = new ApexCharts(document.querySelector(`#chart-${title}`), options);
    chart.render();

    return () => {
      chart.destroy(); // Clean up
    };
  });
</script>

<div class="card">
  <div class="card-header">
    <h3>{title}</h3>
    {#if description}
      <p>{description}</p>
    {/if}
  </div>
  <div class="card-body">
    <div id={`chart-${title}`} style="min-height: 300px;"></div>
  </div>
</div>

<style>
  .card {
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .card-header {
    text-align: center;
  }
  .card-body {
    flex: 1;
  }
</style>
