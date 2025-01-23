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

<Hero />

<hr />

<About />

<hr />

<Projects {projects} />

<hr />

<Contact />

<svg id="w-node-_44d61d46-47bf-d3b3-6c84-7bbcd74680db-97c655a9" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 15 15" fill="none" data-pattern="element" class="icon-1x1-xsmall" style="translate: none; rotate: none; scale: none; transform: translate3d(0px, 0px, 0px);"><path d="M7.5 0C7.75463 4.03197 10.968 7.24539 15 7.5C10.968 7.75463 7.75463 10.968 7.5 15C7.24539 10.968 4.03197 7.75463 0 7.5C4.03197 7.24539 7.24539 4.03197 7.5 0Z" fill="currentColor"></path></svg>
