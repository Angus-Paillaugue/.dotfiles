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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" class="size-6 text-black"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.03573 0L6.96428 0V6.20667L2.57551 1.81789L1.8179 2.57551L6.20667 6.96428H0L0 8.03573H6.20666L1.8179 12.4245L2.57551 13.1821L6.96428 8.7933V15H8.03573V8.7933L12.4245 13.1821L13.1821 12.4245L8.7933 8.03573H15V6.96428H8.7933L13.1821 2.5755L12.4245 1.81789L8.03573 6.20666V0Z" fill="currentColor"></path></svg>
<Hero />

<hr />

<About />

<hr />

<Projects {projects} />

<hr />

<Contact />
