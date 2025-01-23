<script>
  import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	let count = 0;

	const displayed_count = spring(0, {
    stiffness: 0.1,
    damping: 0.3,

  });
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);

	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

  onMount(() => {
    setTimeout(() => {
      count = 404;
    }, 3000);
  });
</script>

<h1>{$page.status}: {$page.error.message}</h1>

	<div class="relative overflow-hidden text-center w-14 h-6">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="-top-full select-none" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

<style>
	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
