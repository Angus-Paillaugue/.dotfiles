<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Ellipsis, ChevronLeft } from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import { backIn } from 'svelte/easing';
	import { Toaster } from 'svelte-sonner'

	const { children, data } = $props();
	const { ip } = data;
</script>

<ModeWatcher />
<Toaster />

<div class="container mx-auto p-4">
	<!-- Heading -->
	<header class="w-full p-2 flex flex-crow items-center justify-between gap-4 relative mb-6">
		<div class="size-10">
			{#if $page.route.id !== '/'}
				<div transition:scale={{ duration: 500, easing: backIn, start: 0, delay: 0 }}>
					<Button
						size="icon"
						variant="outline"
						onclick={() => {
							window.history.back();
						}}
					>
						<ChevronLeft />
					</Button>
				</div>
			{/if}
		</div>
		<h1 class="m-0">Home server</h1>
		<!-- Top right dropdown -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button size="icon" builders={[builder]} variant="outline"><Ellipsis /></Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Group>
					<DropdownMenu.Item href="http://{ip}" target="_blank">
						<span class="px-2 w-10 text-center">IP</span>
						<span class="px-2">{ip}</span>
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onclick={toggleMode} target="_blank">
						<span class="flex flex-row items-center justify-center w-10">
							{#if $mode === 'dark'}
								<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"
									><g
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										><circle cx="12" cy="12" r="4" /><path
											d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
										/></g
									></svg
								>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24"
									><path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
									/></svg
								>
							{/if}
						</span>
						<span>Toggle theme</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</header>
	{@render children()}
</div>
