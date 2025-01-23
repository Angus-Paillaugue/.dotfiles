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

<div class="relative overflow-hidden text-center w-32 h-24">
  <div class="absolute w-full h-full text-6xl font-black" style="transform: translate(0, {100 * offset}%)">
    <span class="-top-full select-none absolute flex w-full h-full items-center justify-center" aria-hidden="true">{Math.floor($displayed_count + 1)}</span>
    <span class="absolute flex w-full h-full items-center justify-center">{Math.floor($displayed_count)}</span>
  </div>
</div>
