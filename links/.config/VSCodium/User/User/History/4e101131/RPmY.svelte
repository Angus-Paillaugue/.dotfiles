<script>
  import Bento from './Bento.svelte';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { project, pages } from '$conf';
  import { onMount } from 'svelte';

  const docsHomePage = getDocsHomePage();

  onMount(() => {
    // For displaying the cta in the navbar when the user scrolls past the cta section
    const observer = new IntersectionObserver(intersect, { threshold: 0 });
    // Observe the cta section
    const ctaSection = document.getElementById('cta');
    observer.observe(ctaSection);

    /**
     * Function to handle the intersection of the node and update the navbar cta display state based on intersection.
     * @param {IntersectionObserverEntry} entry
     */
    function intersect([entry]) {
      getStartedButtonNavShown = !entry.isIntersecting;
    }

    return () => {
      observer.disconnect();
    };
  });

  /**
   * Function to get the documentation home page.
   *
   * @returns {page}
   */
  function getDocsHomePage() {
    // Get the first page that doesn't have children in the pages lists from the config.
    return pages.filter((page) => !page?.children)[0];
  }
</script>

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
  <meta property="og:description" content={project.description} />
  <meta property="twitter:description" content={project.description} />

  <style>
    @keyframes text {
      0%,
      100% {
        background-size: 200% 200%;
        background-position: left center;
      }
      50% {
        background-size: 200% 200%;
        background-position: right center;
      }
    }
  </style>
</svelte:head>

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <Hero {docsHomePage} />

    <Bento />
  </main>

  <Footer />
</div>
