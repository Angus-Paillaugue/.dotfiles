<script lang="ts">
  import { format } from "date-fns";
  import { onMount } from 'svelte';

  let ApexCharts = $state();
  let chartElement = $state();
  let chart = $state();

  let { data = $bindable() }: {
    data: {
      series: { name: string; data: number[] }[];
      categories: string[];
    } | null
  } = $props();

  let options: {
    series: { name: string; data: number[] }[];
    xaxis: {
      type: string;
      categories: string[];
      labels: {
        formatter: (value: string) => string;
      };
    };
    chart: {
      type: string;
      height: number;
      stacked: boolean;
      toolbar: {
        show: boolean;
      };
      zoom: {
        enabled: boolean;
      };
    };
    responsive: {
      breakpoint: number;
      options: {
        legend: {
          position: string;
          offsetX: number;
          offsetY: number;
        };
      };
    }[];
    colors: string[];
    plotOptions: {
      bar: {
        horizontal: boolean;
        borderRadius: number;
        borderRadiusApplication: string;
        borderRadiusWhenStacked: string;
      };
    };
    legend: {
      position: string;
      offsetY: number;
    };
    fill: {
      opacity: number;
    };
  } = {
    series: [],
    xaxis: {
      type: 'datetime',
      categories: [],
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
        show: false
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
    colors:['#4b5563', '#2563eb', '#d97706', '#dc2626', '#e11d48'],
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
    if (chart && data?.series && data?.categories) {
      options.series = data.series;
      options.xaxis.categories = data.categories;
      chart.updateOptions(options);
    }
  });
</script>

<div bind:this={chartElement}></div>
