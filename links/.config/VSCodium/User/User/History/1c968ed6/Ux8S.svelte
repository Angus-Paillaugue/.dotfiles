<script lang="ts">
  import { format } from "date-fns";
  import { onMount } from 'svelte';

  let ApexCharts: ApexCharts | null = $state(null);
  let chartElement = $state();
  let chart = $state();

  let { data = $bindable() }: {
    data: {
      series: { name: string; data: number[] }[];
      categories: string[];
    }
  } = $props();

  let options = {
      series: data.series,
      xaxis: {
        type: 'datetime',
        categories: data.categories,
        labels: {
          formatter: function (value: string) {
            return format(new Date(value), "MMM dd");
          },
        },
      },
      chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [{
      breakpoint: 700,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  }

	onMount(async () => {
		const module = await import('apexcharts');
		ApexCharts = module.default;
    Object.assign(window, { ApexCharts });

    chart = new ApexCharts(chartElement, options);
    chart.render();
	});

  $effect(() => {
    if (chart) {
      console.log(options)
      chart.updateOptions(options);
    }
  });
</script>

<div bind:this={chartElement}></div>
