<script>
  import Bento from './Bento.svelte';

  import { project, pages } from '$conf';
  import Footer from './Footer.svelte';
  import Hero from './Hero.svelte';
  import { addCopyCodeButtonFunctionality } from '$lib/utils';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { Button } from '$lib/components';
  import { backOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

  const accessibilityScore = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
  const performanceScore = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});

  const docsHomePage = getDocsHomePage();
  let getStartedButtonNavShown = $state(false);

  onMount(() => {
    addCopyCodeButtonFunctionality();

    // Run on page scroll and load
    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  /**
   * Function that handles the scroll event.
   */
  function onScroll() {
    const screenHeight = window.screen.availHeight;
    const triggerHeight = window.scrollY + (screenHeight / 3) * 2;
    // Show get started button in the nav when the user scrolls past 1/3 of the screen height
    getStartedButtonNavShown = triggerHeight > screenHeight;

    const accessibilityProgress = document.getElementById('accessibilityProgress');
    const performanceProgress = document.getElementById('performanceProgress');
    accessibilityScore.set(isScrolledIntoView(accessibilityProgress) ? 100 : 0);
    performanceScore.set(isScrolledIntoView(performanceProgress) ? 98 : 0);
  }

  /**
   * Function to get the documentation home page.
   *
   * @returns {page}
   */
  function getDocsHomePage() {
    // Get the first page that doesn't have children in the pages lists from the config.
    return pages.filter((page) => !page?.children)[0];
  }

  function isScrolledIntoView(el, offset = 100) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom + offset <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
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

<!-- Navbar -->
<nav
  class="fixed left-1/2 top-5 z-30 flex h-16 w-[calc(100vw-40px)] -translate-x-1/2 gap-x-6 rounded-full border border-main bg-neutral-50/75 p-4 backdrop-blur-md dark:border-main-dark dark:bg-neutral-600/50 md:w-[584px]"
>
  <div class="relative h-full w-full">
    <div
      class="absolute top-1/2 w-fit -translate-y-1/2 transition-all duration-500 ease-back-out {getStartedButtonNavShown
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'}"
    >
      <h1
        class="m-0 inline-block w-fit bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-center text-2xl font-bold text-transparent dark:from-primary-500 dark:via-neutral-200 dark:to-primary-500 dark:text-transparent"
        style="animation: text 5s ease infinite;"
      >
        {project.name}
      </h1>
    </div>

    {#if getStartedButtonNavShown}
      <span
        transition:fly={{ y: '-100%', duration: 500, easing: backOut }}
        class="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <Button href="/docs/{docsHomePage.name}" name="Go home" class="rounded-full py-1.5"
          >Get started</Button
        >
      </span>
    {/if}
  </div>
</nav>

<div class="isolate flex w-full flex-col bg-body-dark dark:bg-body">
  <main class="overflow-clip rounded-b-[32px] bg-body dark:bg-body-dark">
    <!-- Main page -->
    <Hero {docsHomePage} />

    <!-- Bento grid -->
    <Bento></Bento>
  </main>

  <Footer />
</div>
