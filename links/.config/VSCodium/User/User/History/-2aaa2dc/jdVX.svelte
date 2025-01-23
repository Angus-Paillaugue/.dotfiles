<script>
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components';

	const { children } = $props();
	let activePath = $state('');

	$effect(() => {
		activePath = new URL($page.url).pathname;
	});
</script>

<!-- <div class="flex flex-col fixed top-2 h-16 left-2 right-2 z-40">
	<div
		class="max-w-screen-2xl rounded-xl bg-white p-2 flex flex-row items-center justify-between w-full px-4 mx-auto text-text-heading h-16 mb-2"
	>
		<a href="/"><span>News Dating</span></a>
		<Button
			href="/log-in"
			class={cn(
				'w-fit',
				(activePath === '/log-in' || activePath === '/sign-in') &&
					'underline underline-offset-2 font-medium'
			)}>Get started</Button
		>
	</div>
</div> -->

{@render children()}
