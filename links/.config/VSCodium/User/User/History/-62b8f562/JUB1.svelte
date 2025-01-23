<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';
	import { experience } from '$conf';
	import { _ } from 'svelte-i18n';

	const { data } = $props();
	console.log(data);

	const { projects } = data;
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
