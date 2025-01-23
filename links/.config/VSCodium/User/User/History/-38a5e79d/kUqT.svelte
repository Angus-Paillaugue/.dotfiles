<script lang="ts">
	import { onMount } from 'svelte';

	export let options;

	let ApexCharts: { new(arg0: HTMLElement, arg1: any): any; new(el: any, options: any): ApexCharts; prototype?: any; exec?: (chartID: string, fn: string, ...args: Array<any>) => any; getChartByID?: (chartID: string) => ApexCharts | undefined; initOnLoad?: () => void; };
	let loaded = false;

	const chart = (node: HTMLElement, options) => {

		if (!loaded)
			return

		let myChart = new ApexCharts(node, options)
		myChart.render()

		return {
			update(options) {
				myChart.updateOptions(options)
			},
			destroy() {
				myChart.destroy()
			}
		}
	}

	onMount(async () => {
		const module = await import('apexcharts');
		ApexCharts = module.default;
    Object.assign(window, { ApexCharts });
		loaded = true
	});

</script>

{#if loaded}
  <div use:chart={options}></div>
{/if}
