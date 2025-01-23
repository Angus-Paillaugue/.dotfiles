<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';
	import { experience } from '$conf';
	import { _ } from 'svelte-i18n';
	import { sections } from '$lib/stores';

	const { data } = $props();

	const { projects } = data;

	$sections = [
		{ id: 'home', label: $t('homePage.hero') },
		{ id: 'about', label: $t('homePage.about') },
		{ id: 'projects', label: $t('homePage.projects') },
		{ id: 'contact', label: $t('homePage.contact') }
	];
</script>

<svelte:head>
	<title>{$t('homePage.title')} | Angus Paillaugue</title>
</svelte:head>

<Hero />

<hr />

<About {experience} />

<hr />

<Projects {projects} />

<hr />

<Contact />
