<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';
	import { experience } from '$conf';
	import { _ } from 'svelte-i18n';
	import { setContext } from 'svelte';

	const { data } = $props();
	const { projects } = data;
	setContext('sections', ['hero', 'about', 'projects', 'contact']);
</script>

<svelte:head>
	<title>{$_('homePage.title')} | Angus Paillaugue</title>
</svelte:head>

<Hero />

<hr />

<About {experience} />

<hr />

<Projects {projects} />

<hr />

<Contact />
