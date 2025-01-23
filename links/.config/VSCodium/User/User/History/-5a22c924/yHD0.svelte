<script>
	import '../app.css';
	import Sidebar from '$lib/components/core/Sidebar.svelte';
	import Toasts from '$lib/components/core/Toasts.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { page } from '$app/stores';

	// Watch for mode changes
	$effect(() => {
		$mode === 'dark'
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	});
</script>


<svelte:head>
	<link rel="canonical" href={$page.url.href.split('#')[0]} />
	<meta property="twitter:domain" content={$page.url.hostname} />
	<meta property="twitter:url" content={$page.url.href.split('#')[0]} />

	<meta property="og:url" content={$page.url.href.split('#')[0]} />
	<meta property="og:locale" content={$locale} />
	<meta property="og:site_name" content="My fashion vault" />

	<title>{$_($seo.title)} - MFV</title>
	<meta property="og:title" content={$_($seo.title) + ' - MFV'} />
	<meta property="twitter:title" content={$_($seo.title) + ' - MFV'} />

	<meta name="description" content={$_($seo.description)} />
	<meta property="og:description" content={$_($seo.description)} />
	<meta property="twitter:description" content={$_($seo.description)} />
</svelte:head>

<Toasts />
<ModeWatcher defaultMode={'dark'} />

<div class="flex flex-col lg:flex-row">
	<Sidebar />

	<slot />
</div>
