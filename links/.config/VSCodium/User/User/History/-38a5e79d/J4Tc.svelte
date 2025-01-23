<script>
	import { onMount } from 'svelte';

	let { options } = $props();

	let ApexCharts;
	let loaded = $state(false);

	const chart = (node, options) => {

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

	$effect(() => {
		if (loaded) {
			chart.up
		}
	});

</script>

{#if loaded}
  <div use:chart={options}></div>
{/if}
