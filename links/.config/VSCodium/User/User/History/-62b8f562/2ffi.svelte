<script>
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';

	const { data } = $props();
	const { projects } = data;
</script>

<svelte:head>
	<title>Home | Angus Paillaugue</title>
</svelte:head>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" data-pattern="element" class="size-6 text-black"><path d="M7.5 0C7.75463 4.03197 10.968 7.24539 15 7.5C10.968 7.75463 7.75463 10.968 7.5 15C7.24539 10.968 4.03197 7.75463 0 7.5C4.03197 7.24539 7.24539 4.03197 7.5 0Z" fill="currentColor"></path></svg>
<Hero />

<hr />

<About />

<hr />

<Projects {projects} />

<hr />

<Contact />
