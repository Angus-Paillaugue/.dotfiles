<script>
  import Header from './Header.svelte';

  import Aside from './Aside.svelte';

	import { MenuIcon, Undo2, CircleX } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { fade, scale } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { Button } from '$lib/components';
	import * as m from '$msgs';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { bounceOut } from 'svelte/easing';

	const { children } = $props();

	let mobileMenuOpened = $state(false);
	let path = $derived($page.url.pathname.slice($page.url.pathname.indexOf('/app/') + 5));
	let isExercisePage = $derived(path.includes('exercises/'));
	let pageName = $state();

	const getPageTitle = () => document.title.split('|').slice(0, -1).join('|');

	afterNavigate(() => {
		mobileMenuOpened = false;
		pageName = getPageTitle();
	});

	onMount(() => {
		pageName = getPageTitle();
	});
</script>

<div class="flex h-screen w-full flex-row gap-2 bg-body lg:p-2">
	<Aside {user} bind:mobileMenuOpened />

	<!-- Content -->
	<div class="no-scrollbar flex h-full grow flex-col overflow-auto">
		<!-- Page title and back button on mobile -->
		<Header></Header>
		<div class="flex grow flex-col max-lg:p-2">
			{@render children()}
		</div>
	</div>
</div>
