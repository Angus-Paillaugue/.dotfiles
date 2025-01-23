<script>
  import { project } from '$conf';
  import Bento from './Bento/Bento.svelte';
  import Hero from './Hero/Hero.svelte';
  // import Features from './Features/Features.svelte';
  import Footer from './Footer.svelte';

  const { data } = $props();
  const { docsHomePage } = data;
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta property="og:title" content={project.name} />
  <meta property="twitter:title" content={project.name} />
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />
</svelte:head>

<div class="mx-auto w-full max-w-screen-xl p-1">
  <!-- Hero -->
  <main class="w-full space-y-[200px]">
    <Hero {docsHomePage} />

    <Bento />

    <!-- <Features /> -->

    <Footer />
  </main>
</div>
