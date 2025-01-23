<script>
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

<section class="max-w-screen-xl mx-auto p-2 lg:p-4" id="about">
	<div class="flex flex-col max-lg:items-center">
		<h1>About</h1>
	</div>
	<!-- TODO : make this section -->
</section>

<hr />

<Projects {projects} />

<hr />

<Contact />
