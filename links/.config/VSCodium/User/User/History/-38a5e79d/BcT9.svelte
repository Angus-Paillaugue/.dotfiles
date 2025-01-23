<script lang="ts">
	import { onMount } from 'svelte';

	export let options;

	let ApexCharts: any;
	let loaded: boolean = false;

	const chart = (node: HTMLElement, options: any) => {

		if (!loaded)
			return

		let myChart = new ApexCharts(node, options)
		myChart.render()

		return {
			update(options: any) {
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
