<script lang="ts">
  import { format } from "date-fns";
  import { onMount } from 'svelte';
  import { cn } from "$lib/utils"

  let ApexCharts = $state();
  let chartElement = $state();
  let chart = $state();
  let canShow = $state(false);

  let { data = $bindable() }: {
    data: {
      series: { name: string; data: number[] }[];
      categories: string[];
    } | null
  } = $props();

  let options = {
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
      canShow = true;
    }
  });
</script>

{#if !canShow}
<div class="w-fulll" style="height: {options.chart.height}px;"></div>
{/if}
<div bind:this={chartElement} class={cn(canShow ? 'block' : 'hidden')}></div>
