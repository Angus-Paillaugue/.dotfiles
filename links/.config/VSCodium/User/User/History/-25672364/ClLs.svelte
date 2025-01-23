<script>
  import { onMount } from 'svelte';

  let isLoaded = $state(false);

  onMount(() => {
		isLoaded = true;
	});

</script>

<svelte:head>
	<style>
		@keyframes fade {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	</style>
</svelte:head>

<div class="z-50 fixed inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
	{#each { length : 12 * 12} as _, i}
		<div class="w-full h-full bg-white" style="opacity: 1;" style:animation={isLoaded && `2s ease ${i* 10}ms forwards fade`}></div>
	{/each}
</div>
