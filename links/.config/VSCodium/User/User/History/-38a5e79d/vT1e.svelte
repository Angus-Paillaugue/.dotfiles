<script>
	import { onMount } from 'svelte';

	let { options = $bindable() } = $props();

	let ApexCharts;
	let loaded = $state(false);

	const chart = (node, options) => {

		if (!loaded)
			return

		let myChart = new ApexCharts(node, options)
		myChart.render();

		$effect(() => {
			myChart.updateOptions(options)
		})

		return {
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
